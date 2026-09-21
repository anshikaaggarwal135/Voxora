from flask import Blueprint, request, jsonify

from services.tts_service import generate_audio, VOICE_MAP

tts_bp = Blueprint("tts", __name__)

@tts_bp.route("/api/voices", methods=["GET"])
def get_voices():
    voices = list(VOICE_MAP.keys())

    return jsonify({
        "success": True,
        "voices": voices
    })
@tts_bp.route("/api/tts", methods=["POST"])
def generate_speech():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Request body is required"
        }), 400

    text = data.get("text")
    language = data.get("language")
    voice = data.get("voice")

    if not text:
        return jsonify({
            "success": False,
            "error": "Text is required"
        }), 400

    if not language:
        return jsonify({
            "success": False,
            "error": "Language is required"
        }), 400

    if not voice:
        return jsonify({
            "success": False,
            "error": "Voice is required"
        }), 400

    if len(text) > 5000:
        return jsonify({
            "success": False,
            "error": "Text cannot exceed 5000 characters"
        }), 400

    try:
        filename = generate_audio(
            text,
            language,
            voice
        )

        return jsonify({
            "success": True,
            "message": "Speech generated successfully",
            "audio_url": f"/audio/{filename}"
        })

    except ValueError as e:
        print("TTS Validation Error:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

    except Exception as e:
        print("TTS Error:", e)

        return jsonify({
            "success": False,
            "error": "Failed to generate speech"
        }), 500