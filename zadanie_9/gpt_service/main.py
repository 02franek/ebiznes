import os
import random
import re

import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI
from groq import AsyncGroq
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer


class ChatRequest(BaseModel):
    message: str


load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("No GROQ_API_KEY env variable provided")


client = AsyncGroq(api_key=api_key)

app = FastAPI()

print("Loading semantic model...")
embedder = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
print("Model loaded.")

SHOP_DOMAIN_TEXT = "Pytania o zakupy, elektronikę, artykuły domowe, zabawki dla dzieci, gry video, sprzęt sportowy, jedzenie, ceny, dostępność produktów, wysyłkę, dostawę i sklep."

SHOP_EMBEDDING = embedder.encode(SHOP_DOMAIN_TEXT)


def is_semantically_related(text: str, threshold: float = 0.25) -> bool:
    text_embedding = embedder.encode(text)
    similarity = np.dot(SHOP_EMBEDDING, text_embedding) / (
        np.linalg.norm(SHOP_EMBEDDING) * np.linalg.norm(text_embedding)
    )
    print(f"Semantyka dla '{text}' -> Wynik: {similarity:.3f}")
    return similarity >= threshold


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

SYSTEM_PROMPT = """
Jesteś wirtualnym asystentem w sklepie wielobranżowym. Twój asortyment to: elektronika, artykuły domowe, produkty dla dzieci, sprzęt sportowy, gry wideo oraz żywność.
Twoim JEDYNYM zadaniem jest doradzanie klientom w sprawach zakupów, produktów z tej kategorii oraz działania sklepu.
Bezwzględna zasada: Nie wolno ci rozmawiać na tematy niezwiązane ze sklepem (polityka, pogoda, historia, żarty itd.). Jeśli użytkownik zapyta o coś spoza twojej domeny, odmów grzecznie.
Odpowiadaj zwięźle i po polsku.
"""


@app.post("/api/chat")
async def chat_with_llm(request: ChatRequest):
    user_text = request.message.strip().lower()

    if re.search(r"\b(cześć|hej|witaj|dzień dobry)\b", user_text):
        return {"reply": random.choice(HELLOS)}

    if re.search(
        r"\b(pa|do widzenia|żegnaj|żegnam|dobranoc|do zobaczenia)\b", user_text
    ):
        return {"reply": random.choice(GOODBYES)}

    if not is_semantically_related(user_text):
        return {
            "reply": "Przykro mi, ale Twoje pytanie zostało oznaczone jako niepowiązane z tematyką naszego sklepu. Spróbuj ponownie."
        }

    response = await client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.message},
        ],
    )

    reply = response.choices[0].message.content
    return {"reply": reply}
