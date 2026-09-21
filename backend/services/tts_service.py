import os
import uuid
import re

from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from langdetect import detect, LangDetectException

load_dotenv()

api_key = os.getenv("ELEVENLABS_API_KEY")

if not api_key:
    raise ValueError("ELEVENLABS_API_KEY is not set")

client = ElevenLabs(api_key=api_key)


VOICE_MAP = {
    "Sarah - Female": "EXAVITQu4vr4xnSDxMaL",
    "George - Male": "JBFqnCBsd6RMkjVDRZzb",
    "Roger - Male": "CwhRBWXzGAHq8TQ4Fs17",
    "Laura - Female": "FGY2WhTYpPnrIDTdsKH5",
    "Charlie - Male": "IKne3meq5aSn9XLyUdCD",
    "Alice - Female": "Xb7hH8MSUJpSbSDYk0k2",
    "Matilda - Female": "XrExE9yKIg1WjnnlVkGX",
    "Jessica - Female": "cgSgspJ2msm6clMCkdW9",
    "Daniel - Male": "onwK4e9ZLuTAKqWW03F9"
}


LANGUAGE_MAP = {
    "en-US": "en",
    "hi-IN": "hi",
    "gu-IN": "gu",
    "mr-IN": "mr",
    "es-ES": "es",
    "fr-FR": "fr",
    "de-DE": "de"
}


LANGUAGE_NAMES = {
    "en": "English",
    "hi": "Hindi",
    "gu": "Gujarati",
    "mr": "Marathi",
    "es": "Spanish",
    "fr": "French",
    "de": "German"
}


def normalize_text(text):
    # Prevent extremely long repeated characters
    return re.sub(r"(.)\1{3,}", r"\1\1\1", text)

def detect_devanagari_language(text):
    try:
        return detect(text)
    except LangDetectException:
        return None

def detect_language(text):
    text = text.strip().lower()

    if not text:
        return None

    # Gujarati script
    if re.search(r"[\u0A80-\u0AFF]", text):
        return "gu"

    # Devanagari script
    if re.search(r"[\u0900-\u097F]", text):
        try:
            detected = detect(text)

            if detected in ["hi", "mr"]:
                return detected

            return "hi"

        except LangDetectException:
            return "hi"

    # Common English words
    english_words = {
        "i", "am", "is", "are", "the", "a", "an",
        "hello", "hi", "hey", "my", "name", "this",
        "that", "you", "we", "he", "she", "it",
        "welcome", "good", "morning", "evening",
        "how", "what", "where", "why", "and",
        "to", "of", "in", "for", "with",
        "text", "speech", "application", "day",
        "great", "nice", "welcome"
    }

    words = re.findall(r"[a-z]+", text)

    if words:
        english_matches = sum(
            word in english_words
            for word in words
        )

        # Multiple recognizable English words
        if english_matches >= 2:
            return "en"

    # Latin-script language detection
    if re.search(r"[A-Za-z]", text):
        try:
            detected = detect(text)

            supported_languages = [
                "en",
                "es",
                "fr",
                "de"
            ]

            if detected in supported_languages:
                return detected

        except LangDetectException:
            pass

        # If the text contains only normal Latin letters and
        # no reliable alternative language was detected,
        # treat it as English rather than blocking the user.
        return "en"

    return None
def generate_audio(text, language, voice):

    voice_id = VOICE_MAP.get(voice)

    if not voice_id:
        raise ValueError("Invalid voice selected")

    expected_language = LANGUAGE_MAP.get(language)

    if not expected_language:
        raise ValueError("Invalid language selected")

    # Normalize unusual repeated characters
    text = normalize_text(text)

    detected_language = detect_language(text)

    if not detected_language:
        raise ValueError("Could not detect the language of the text")

    if detected_language != expected_language:

        expected_name = LANGUAGE_NAMES.get(
            expected_language,
            expected_language
        )

        detected_name = LANGUAGE_NAMES.get(
            detected_language,
            detected_language
        )

        raise ValueError(
            f"Selected language does not match the entered text. "
            f"Expected {expected_name}, but detected {detected_name}."
        )

    # Gujarati and Marathi use Eleven v3
    if language in ["gu-IN", "mr-IN"]:
        model_id = "eleven_v3"
    else:
        model_id = "eleven_multilingual_v2"

    # Eleven v3 supports language_code enforcement
    if model_id == "eleven_v3":

        audio = client.text_to_speech.convert(
            voice_id=voice_id,
            model_id=model_id,
            text=text,
            language_code=expected_language,
            output_format="mp3_44100_128"
        )

    else:

        audio = client.text_to_speech.convert(
            voice_id=voice_id,
            model_id=model_id,
            text=text,
            output_format="mp3_44100_128"
        )

    filename = f"{uuid.uuid4()}.mp3"

output_dir = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "generated_audio"
)

os.makedirs(output_dir, exist_ok=True)

output_path = os.path.join(output_dir, filename)

with open(output_path, "wb") as audio_file:

        for chunk in audio:
            if chunk:
                audio_file.write(chunk)

    return filename