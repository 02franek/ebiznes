import os

from dotenv import load_dotenv
from fastapi import FastAPI
from groq import AsyncGroq
from pydantic import BaseModel

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("No GROQ_API_KEY env variable provided")


client = AsyncGroq(api_key=api_key)

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat_with_llm(request: ChatRequest):
    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": request.message}],
    )

    reply = response.choices[0].message.content
    return {"reply": reply}
