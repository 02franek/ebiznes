from fastapi import FastAPI
from openai import AsyncOpenAI
from pydantic import BaseModel

client = AsyncOpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat_with_llm(request: ChatRequest):
    response = await client.chat.completions.create(
        model="phi3", messages=[{"role": "user", "content": request.message}]
    )

    reply = response.choices[0].message.content
    return {"reply": reply}
