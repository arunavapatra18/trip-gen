import requests
import json
from datetime import datetime
from dotenv import load_dotenv
import os
from config import api_key,url

def send_data_to_llm(dic):
    response = requests.post(
          url= os.getenv('URL'),
          headers={
            "Authorization": f"Bearer {api_key}"
          },
          data=json.dumps({
            "model" : "anthropic/claude-3.5-sonnet", # Optional
            "messages": [
              {
                "role": "user",
                "content": str(dic)
              }
            ]
          })
    )
    response_meta=response.json()
    return response_meta["choices"][0]["message"]["content"]






