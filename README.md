# Text-to-Speech Application

A web-based Text-to-Speech application that converts written text into natural-sounding speech using a React frontend, Python Flask backend, and ElevenLabs Text-to-Speech API.

## Features

- Convert text into natural-sounding speech
- Support for multiple languages
- Multiple voice options
- Automatic text language detection
- Language mismatch validation
- Maximum text limit of 5000 characters
- Character and word counter
- Speech generation status indicator
- Audio playback directly in the browser
- Download generated audio
- Clear text option
- New Speech option
- Responsive design for different screen sizes
- Secure API key handling using environment variables

## Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Python
- Flask
- Flask-CORS

### Text-to-Speech

- ElevenLabs API

### Additional Python Libraries

- python-dotenv
- langdetect
- uuid

## Project Structure

```text
Text_to_speech/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── routes/
│   │   └── tts_routes.py
│   │
│   ├── services/
│   │   └── tts_service.py
│   │
│   ├── generated_audio/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
├── .gitignore
└── README.md