## This Script will take my me.md file, Turn it into math ( EMBEDDINGS ), and store it in Qdrant.

import os
from qdrant_client import QdrantClient
from qdrant_client.http import models
from langchain_huggingface import HuggingFaceEmbeddings # Updated import to remove warnings
from langchain_qdrant import QdrantVectorStore # Updated import for Langchain 0.2+

def get_vector_store():
    # 1. Initialize Embeddings ( FREE & runs locally )
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # 2. Connect to Qdrant Cloud
    client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY")
    )

    collection_name = "portfolio_data"

    # 3. Check if the collection exists, if not, create it
    # This prevents the 404 error you just saw!
    collections = client.get_collections().collections
    exists = any(c.name == collection_name for c in collections)

    if not exists:
        print(f"Creating collection: {collection_name}")
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=384, # all-MiniLM-L6-v2 uses 384 dimentions
                distance=models.Distance.COSINE
            ),
        )

    # 4. Return the Vector Store
    return QdrantVectorStore(
        client=client,
        collection_name=collection_name,
        embedding=embeddings
    )