import os
import random
import re

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


HELLOS = [
    "Cześć, w czym mogę pomóc?",
    "Witaj w naszym sklepie.",
    "Hej! Jak mogę pomóc?",
    "Dzień dobry, czego potrzeba?",
    "Witaj. Jestem robotem.",
]

GOODBYES = [
    "Dziękuję za wizytę.",
    "Żegnaj",
    "Do widzenia.",
    "Dziękujemy i zapraszamy ponownie",
    "Dzięki za rozmowę. Powodzenia w zakupach.",
]


@app.post("/api/chat")
async def chat_with_llm(request: ChatRequest):
    user_text = request.message.strip().lower()

    if re.search(r"\n(cześć|hej|witaj|dzień dobry)\b", user_text):
        return {"reply": random.choice(HELLOS)}

    if re.search(
        r"\b(pa|do widzenia|żegnaj|żegnam|dobranoc|do zobaczenia)\b", user_text
    ):
        return {"reply": random.choice(GOODBYES)}

    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": request.message}],
    )

    reply = response.choices[0].message.content
    return {"reply": reply}
