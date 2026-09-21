# 🎙️ Voxora — Text-to-Speech Application

<p align="center">
  <strong>✨ Turn your words into natural-sounding speech ✨</strong>
</p>

<p align="center">
  A modern web-based Text-to-Speech application built with React, Flask and ElevenLabs.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/ElevenLabs-TTS-8B5CF6?style=for-the-badge" alt="ElevenLabs">
</p>

---
## 🌐 Live Demo

🚀 **Try Voxora online:**

**https://voxora-omega.vercel.app/**

### 🔗 Project Links

- 🌐 **Frontend:** https://voxora-omega.vercel.app/
- ⚙️ **Backend API:** https://voxora-backend-ky1v.onrender.com
- 💻 **GitHub Repository:** https://github.com/anshikaaggarwal135/Voxora

---

## 🌟 About Voxora

**Voxora** is a web-based Text-to-Speech application that converts written text into natural-sounding speech.

The application provides a simple and modern interface where users can enter text, select a language and voice, generate speech, listen to the generated audio, and download it.

Voxora uses a **React frontend**, **Python Flask backend**, and the **ElevenLabs Text-to-Speech API** to generate high-quality speech.

---

## ✨ Features

- 📝 **Text Input** — Enter or paste text easily
- 🔢 **Character Counter** — Track up to 5000 characters
- 📊 **Word Counter** — See the number of words instantly
- 📈 **Character Progress Bar** — Visual indication of text usage
- 🌍 **Multiple Languages** — English, Hindi, Gujarati, Marathi, Spanish, French and German
- 🎙️ **Multiple Voices** — Choose from available ElevenLabs voices
- 🧠 **Language Detection** — Detects the language of entered text
- ⚠️ **Language Validation** — Prevents mismatched language selection
- 🔊 **Text-to-Speech Generation** — Convert text into speech
- 🎧 **Audio Playback** — Listen directly in the browser
- ⬇️ **Audio Download** — Download generated speech as MP3
- 🧹 **Clear Text** — Quickly clear the text area
- 🔄 **New Speech** — Start a fresh conversion
- ⏳ **Generation Status** — Visual feedback while speech is being generated
- 📱 **Responsive Design** — Works across desktop and smaller screens
- 🔐 **Secure API Key Handling** — API credentials are stored using environment variables

---

## 🛠️ Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| ⚛️ React | User interface |
| ⚡ Vite | Development/build tool |
| 🟨 JavaScript | Application logic |
| 🎨 CSS | Styling and responsive design |
| 🌐 HTML | Page structure |

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| 🐍 Python | Backend programming |
| 🌶️ Flask | REST API |
| 🔗 Flask-CORS | Frontend-backend communication |
| 🔎 LangDetect | Language detection |
| 🔐 python-dotenv | Environment variable management |

### 🔊 Text-to-Speech

| Technology | Purpose |
|---|---|
| 🤖 ElevenLabs API | Speech generation |
| 🎵 MP3 | Generated audio format |

---
### ☁️ Deployment

| Platform | Purpose |
|---|---|
| ▲ Vercel | React frontend hosting |
| 🚀 Render | Flask backend hosting |
| 🐙 GitHub | Source code and version control |

---

## 🏗️ How Voxora Works

```text
                 ┌─────────────────────┐
                 │      👤 User        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   ⚛️ React Frontend │
                 │                     │
                 │  Text + Language   │
                 │  + Voice Selection │
                 └──────────┬──────────┘
                            │
                         HTTP POST
                            │
                            ▼
                 ┌─────────────────────┐
                 │   🌶️ Flask Backend  │
                 │                     │
                 │   Validation        │
                 │   Language Check    │
                 │   API Processing    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ 🤖 ElevenLabs API   │
                 │                     │
                 │  Text → Speech     │
                 └──────────┬──────────┘
                            │
                         MP3 Audio
                            │
                            ▼
                 ┌─────────────────────┐
                 │   🎧 Audio Player   │
                 │                     │
                 │   ▶️ Listen         │
                 │   ⬇️ Download       │
                 └─────────────────────┘

```
## 📁 Project Structure

```text
Voxora/
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 App.css
│   │   └── 📄 ...
│   ├── 📄 package.json
│   └── 📄 ...
│
├── 📁 backend/
│   ├── 📁 routes/
│   │   └── 📄 tts_routes.py
│   │
│   ├── 📁 services/
│   │   └── 📄 tts_service.py
│   │
│   ├── 📁 generated_audio/
│   ├── 📄 app.py
│   ├── 📄 requirements.txt
│   └── 🔐 .env
│
├── 📄 .gitignore
└── 📄 README.md

```
🔐 The .env, virtual environment, generated audio and other unnecessary files are excluded from Git using .gitignore.

## 🌍 Supported Languages
```text
| Language | Code    | Icon |
| -------- | ------- | ---- |
| English  | `en-US` | 🇬🇧 |
| Hindi    | `hi-IN` | 🇮🇳 |
| Gujarati | `gu-IN` | 🇮🇳 |
| Marathi  | `mr-IN` | 🇮🇳 |
| Spanish  | `es-ES` | 🇪🇸 |
| French   | `fr-FR` | 🇫🇷 |
| German   | `de-DE` | 🇩🇪 |

```
## 🔌 API Endpoints
### ❤️ Health Check
```text
GET /api/health
```

Response:
```text
{
  "status": "ok"
}
```
## 🎙️ Get Available Voices
```text
🎙️ Get Available Voices
```
Response:
```text
{
  "success": true,
  "voices": [
    "Sarah - Female",
    "George - Male"
  ]
}
```

## 🔊 Generate Speech
```text
POST /api/tts
```
Request:
```text
{
  "text": "Hello, welcome to Voxora.",
  "language": "en-US",
  "voice": "Sarah - Female"
}
```
Successful response:
```text
{
  "success": true,
  "message": "Speech generated successfully",
  "audio_url": "/audio/generated-file.mp3"
}
```
## 🚀 Getting Started
### 📥 1. Clone the Repository
```text
git clone https://github.com/anshikaaggarwal135/Voxora.git
cd Voxora
```

### 🐍 2. Setup the Backend

Navigate to the backend:
```text
cd backend
```
Create a virtual environment:
```text
python -m venv venv
```
Activate it on Windows:
```text
venv\Scripts\activate
```
Install dependencies:
```text
pip install -r requirements.txt
```


### ▶️ 3. Start the Flask Backend

From the backend directory:
```text
python app.py
```
Backend:
```text
http://127.0.0.1:5000
```

### ⚛️ 4. Start the React Frontend

Open another terminal:
```text
cd frontend
```
Install dependencies:
```text
npm install
```
Start the development server:
```text
npm run dev
```
Frontend:
```text
http://localhost:5173
```
## ☁️ Production Deployment

Voxora is deployed as a full-stack application using separate frontend and backend services.

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

🌐 Live application:
```text
https://voxora-omega.vercel.app/
```
### Backend — Render

The Flask backend is deployed on Render.

⚙️ Backend:
```text
https://voxora-backend-ky1v.onrender.com
```
## Production Flow
```text
Vercel
  │
  │ HTTPS API Request
  ▼
Render
  │
  │ API Request
  ▼
ElevenLabs
  │
  │ Generated MP3
  ▼
Render
  │
  ▼
Vercel → Audio Player
```
## 🧪 Testing & Validation
Tested Features

- ✅ Empty text validation
- ✅ 5000-character limit
- ✅ Word counter
- ✅ Character counter
- ✅ Language selection
- ✅ Voice selection
- ✅ Language mismatch validation
- ✅ Speech generation
- ✅ Audio playback
- ✅ Audio download
- ✅ Clear text
- ✅ New Speech functionality
- ✅ Backend health endpoint
- ✅ Voice API endpoint
- ✅ Production frontend-to-backend communication
- ✅ Production speech generation

Users receive clear error messages through the interface.
## Production API Test

The /api/tts endpoint was tested with:
```text
{
  "text": "Hello.",
  "language": "en-US",
  "voice": "Sarah - Female"
}
```
The backend successfully generated an MP3 response.
## 🎯 Application Flow
```text
📝 Enter Text
      ↓
🌍 Select Language
      ↓
🎙️ Select Voice
      ↓
🔍 Validate Input
      ↓
🧠 Detect Language
      ↓
🔊 Generate Speech
      ↓
🎧 Play Audio
      ↓
⬇️ Download Audio

```
## 🛡️ Validation & Error Handling

Voxora handles several common errors:

- ❌ Empty text

- ❌ Text exceeding 5000 characters

- ❌ Missing language

- ❌ Missing voice

- ❌ Invalid language

- ❌ Invalid voice

- ❌ Language mismatch

- ❌ Language detection failure

- ❌ TTS API failures

- ❌ Backend generation errors

Users receive clear error messages through the interface.
## 🔮 Future Improvements
Some possible future enhancements include:

- 👤 User authentication
- 🕘 Speech generation history
- 💾 Cloud audio storage
- 🎚️ Speech speed control
- 🎛️ Voice customization
- 🔊 Voice preview
- 🌎 Additional languages
- 📱 Improved mobile experience
- ☁️ Production deployment
- 🗂️ Saved audio library


## 🔐 Security

Voxora keeps sensitive credentials outside the source code.

The ElevenLabs API key is stored in:
```text
backend/.env
```
and excluded from GitHub using:
```text
backend/.env
```
in .gitignore.
## 🎓 Learning Outcomes

Through this project, the following concepts were practiced:

- React frontend development
- Component-based UI development
- REST API communication
- Flask backend development
- API request and response handling
- Third-party API integration
- Text-to-Speech technology
- Language detection
- Input validation
- Error handling
- Environment variable management
- Git and GitHub
- Postman API testing
- Vercel deployment
- Render deployment
- Full-stack application architecture

## 👩‍💻 Author

Anshika Aggarwal

💻 Web Developer | 🐍 Python Learner | 🧩 DSA Enthusiast

<p align="center">

<strong>🎙️ Voxora — Give Your Words a Voice.</strong>

</p> ```