import requests
import json
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()
dic={
    "Description":"Please plan a trip based on given key values",
    "start_date" : "20-12-2025",
    "source": "Kanpur",
    "Destination":"Banglore",
    "days": 10
  }
api_key=os.getenv('OPENROUTER_API_KEY')
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
# x=response.json()
# print(x["choices"][0]["message"]["content"])

# Assuming `x` is the response from the API
x = response.json()  # Your response is already parsed as JSON

# Extract the content from the response
content = x["choices"][0]["message"]["content"]
print(content)
# # Create a JSON body by including the content dynamically
# json_body = {
#     "content": content,
#     "other_field": "other_value",  # You can add more fields here if necessary
# }

# # Convert the JSON body into a JSON string (for use in requests or further processing)
# json_string = json.dumps(json_body)

# # If you need to print the JSON body (for debugging or sending it in a request)
# print(json_string)






