import requests
import json
from datetime import datetime
from dotenv import load_dotenv
import os
from config import api_key


def send_data_to_llm(dic) -> dict:
    response = requests.post(
        url=os.getenv("URL"),
        headers={"Authorization": f"Bearer {api_key}"},
        data=json.dumps(
            {
                "model": "google/gemini-2.0-flash-001",  # Optional
                "messages": [{"role": "user", "content": str(dic)}],
            }
        ),
    )
    response_meta = response.json()
    return response_meta["choices"][0]["message"]["content"]
