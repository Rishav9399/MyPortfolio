import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.tools.tavily_search import TavilySearchResults

# Load the variables from .env
load_dotenv()

def get_llm():
    """
    Returns a configured Groq LLM instance.
    Llama 3.3 70B is currently the best balance of speed and intelligence on the free tier.
    """
    return ChatGroq(
        temperature=0.5,
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.3-70b-versatile"
    )

def get_search_tool():
    """
    Returns the Tavily search tool for real-time data.
    """
    return TavilySearchResults(max_results=1)
    