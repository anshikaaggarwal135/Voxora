import requests


url = "http://127.0.0.1:5000/api/tts"

data = {
    "text": "Hello, welcome to my Text-to-Speech application.",
    "language": "en-US",
    "voice": "English Female"
}

response = requests.post(url, json=data)

print("Status Code:", response.status_code)
print("Response:")
print(response.json())