from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

from routes.tts_routes import tts_bp


app = Flask(__name__)

CORS(app)


# Register TTS routes
app.register_blueprint(tts_bp)


@app.route("/")
def home():
    return jsonify({
        "message": "Text-to-Speech API is running"
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "ok"
    })
@app.route("/audio/<filename>")
def serve_audio(filename):
    return send_from_directory("generated_audio", filename)


@app.route("/download/<filename>")
def download_audio(filename):
    return send_from_directory(
        "generated_audio",
        filename,
        as_attachment=True
    )
if __name__ == "__main__":
    app.run(debug=True)