import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import CharacterTextSplitter
from app.ai.vector import get_vector_store

load_dotenv()

def ingest_data():
    # 1. Load your 'me.md' from data folder
    print("Reading your Knowledge base...")
    loader = DirectoryLoader('data/', glob="**/*.md", loader_cls=TextLoader)
    docs = loader.load()

    # 2. Split text into chunks (AI likes bite-sized pieces)
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_documents(docs)

    # 3. Upload to Qdrant
    print(f"Uploading {len(chunks)} chunks to Qdrant Cloud...")
    vector_store = get_vector_store()
    vector_store.add_documents(chunks)

    print("✅ Memory synced successfully!")

if __name__ == "__main__":
    ingest_data()