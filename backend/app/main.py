import datetime
import random
import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Internal Imports
from app.ai.llm import get_llm, get_search_tool
from app.ai.vector import get_vector_store

app = FastAPI()

# 1. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allows your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# --- PERSISTENT STORAGE LOGIC ---
DATA_FILE = "usage_data.json"
DAILY_LIMIT = 33

def load_stats():
    """Load token usage from disk so it survives server restarts."""
    today_str = str(datetime.date.today())
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                data = json.load(f)
                if data.get("date") == today_str:
                    return data
        except Exception:
            pass
    return {"date": today_str, "count": 0}

def save_stats(count):
    """Save current usage count to disk."""
    with open(DATA_FILE, "w") as f:
        json.dump({"date": str(datetime.date.today()), "count": count}, f)

# Initialize usage stats
usage_stats = load_stats()

SNARKY_REPLIES = [
    "Listen, I'm Rishav's high-end Neural Interface, not your personal Wikipedia. My daily quota for random nonsense is tapped out. Come back tomorrow for world trivia, but if you want to talk about the Maestro's code, I'm all ears.",
    "ERROR 429: User is being too 'basic'. My real-time data link is closed for the day. Ask me about Rishav's projects or move along, gonk.",
    "Neural Link saturated. I've spent my daily energy answering random world facts. I'm saving my last few processors for people who actually care about Rishav's God-Tier portfolio.",
    "My internet uplink costs more than your curiosity is worth right now. The daily limit for 'General Questions' is dead. But hey, I can still tell you why Rishav's FastAPI skills are unmatched?"
]

@app.get("/")
async def root():
    return {"status": "online", "message": "Welcome to PortFolio AI Engine", "version": "1.1.0"}

@app.post("/chat")
async def chat(request: ChatRequest):
    global usage_stats

    # 1. Initialize Brain and Memory
    llm = get_llm()
    vector_store = get_vector_store()

    # 2. Daily Reset Logic (Check if a new day has started)
    today_str = str(datetime.date.today())
    if usage_stats["date"] != today_str:
        usage_stats = {"date": today_str, "count": 0}
        save_stats(0)

    # 3. THE SMART ROUTER (Token Efficiency Optimized)
    routing_prompt = f"""
    Analyze the user's message: "{request.message}"
    
    Rules:
    1. If the question is about Rishav, his skills, or this site -> IDENTITY.
    2. If the question is a factual query about events happening AFTER December 2023 (current prices, 2024-2026 sports, today's news) -> REALTIME.
    3. If the question is about history, science, coding, or facts BEFORE 2024 (e.g., "Who was US President in 2021?") -> CHAT.
    4. If it's small talk (Hello, How are you, OK) -> CHAT.

    Answer only with the category name: IDENTITY, REALTIME, or CHAT.
    """
    category = llm.invoke(routing_prompt).content.strip().upper()

    context = ""
    source = "Internal Brain"

    # 4. THE 3-LAYER LOGIC
    if "IDENTITY" in category:
        # Layer 1: RAG (Always Free)
        search_results = vector_store.similarity_search(request.message, k=2)
        context = "\n".join([doc.page_content for doc in search_results])
        source = "Rishav's Core Memory"
    
    elif "REALTIME" in category:
        # Layer 2: Tavily (Limited 33/day)
        if usage_stats["count"] < DAILY_LIMIT:
            search_tool = get_search_tool()
            context = search_tool.invoke(request.message)
            
            # Increment and persist usage
            usage_stats["count"] += 1
            save_stats(usage_stats["count"])
            source = "Neural Web Link"
        else:
            # Layer 3: The Firewall (Sarcastic rejection)
            return {
                "response": random.choice(SNARKY_REPLIES),
                "source": "System Firewall",
                "remaining": 0
            }
    
    # Layer 4: CHIT-CHAT (Default logic)
    # If category is CHAT, context stays empty and source remains "Internal Brain"

    # 5. FINAL SYNTHESIS
    final_prompt = f"""
    You are Rishav's Cyberpunk AI Agent.
    Tone: Witty, sarcastic, elite engineering authority.
    Info Source: {source}
    Retrieved Context: {context}

    Instruction:
    - If category is CHIT-CHAT: Use your vast internal knowledge for free.
    - If Category is IDENTITY: Be Rishav's biggest advocate and use the retrieved context.
    - If the user is stubborn/annoyed: Stay in the Cyberpunk persona.

    User Message: {request.message}
    """

    response = llm.invoke(final_prompt)
    
    return {
        "response": response.content,
        "source": source,
        "remaining": DAILY_LIMIT - usage_stats["count"]
    }