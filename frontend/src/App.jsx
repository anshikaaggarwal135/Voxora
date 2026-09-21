import { useEffect, useRef, useState } from "react";
import "./App.css";
const languages = [
  { value: "en-US", label: "English", icon: "EN" },
  { value: "hi-IN", label: "Hindi", icon: "HI" },
  { value: "gu-IN", label: "Gujarati", icon: "GU" },
  { value: "mr-IN", label: "Marathi", icon: "MR" },
  { value: "es-ES", label: "Spanish", icon: "ES" },
  { value: "fr-FR", label: "French", icon: "FR" },
  { value: "de-DE", label: "German", icon: "DE" }
];
function App() {
  const [text, setText] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const voiceDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }

      if (
        voiceDropdownRef.current &&
        !voiceDropdownRef.current.contains(event.target)
      ) {
        setVoiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("Sarah - Female");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch(
          "https://voxora-backend-ky1v.onrender.com/api/voices"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Failed to load voices.");
        }

        setVoices(data.voices);

        if (data.voices.length > 0) {
          setVoice(data.voices[0]);
        }
      } catch (error) {
        console.error("Failed to load voices:", error);
        setError("Unable to load voices. Please try again.");
      }
    };

    fetchVoices();
  }, []);
  const [voices, setVoices] = useState([]);
  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const generateSpeech = async () => {
    setError("");
    setAudioUrl("");

    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    if (text.length > 5000) {
      setError("Text cannot exceed 5000 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
         "https://voxora-backend-ky1v.onrender.com/api/tts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            language: language,
            voice: voice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to generate speech."
        );
      }

      const fullAudioUrl =
        `https://voxora-backend-ky1v.onrender.com${data.audio_url}`;

      setAudioUrl(fullAudioUrl);

    } catch (error) {
      console.error(error);
      setError(
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };
  const resetSpeech = () => {
    setText("");
    setAudioUrl("");
    setError("");
    setLoading(false);
    setIsTyping(false);
  };
  return (
    <div className="app">
      <div className="tts-card">
        <div
          className={`assistant-mascot ${isTyping ? "peeking" : ""
            } ${loading ? "working" : ""
            }`}
        >
          <div className="mascot-body">
            <div className="mascot-face">
              <span className="eye left-eye">
                <span className="pupil"></span>
              </span>

              <span className="eye right-eye">
                <span className="pupil"></span>
              </span>
              <span className="mascot-mouth"></span>
            </div>

            <div className="mascot-hands">
              <span>🤚</span>
              <span>🤚</span>
            </div>
          </div>

          <div className="mascot-shadow"></div>
        </div>


        <h1>Text-to-Speech</h1>

        <p className="subtitle">
          Convert your text into natural-sounding speech
        </p>

        <div className="textarea-wrapper">

          <textarea
            value={text}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={(e) => {
              setText(e.target.value);

              setIsTyping(true);

              if (typingTimer.current) {
                clearTimeout(typingTimer.current);
              }

              typingTimer.current = setTimeout(() => {
                setIsTyping(false);
              }, 1200);
            }}
            placeholder="Type or paste your text here..."
            maxLength={5000}
          />

          {text && (
            <button
              type="button"
              className="clear-text-button"
              onClick={() => setText("")}
            >
              Clear text
            </button>
          )}

        </div>

        <div className="text-info">
          <div className="text-counts">
            <span>{text.length}/5000 characters</span>
            <span>{wordCount} words</span>
          </div>

          <div className="character-progress">
            <div
              className="character-progress-fill"
              style={{
                width: `${(text.length / 5000) * 100}%`
              }}
            ></div>
          </div>
        </div>

        <div
          className="selection-container"
          ref={languageDropdownRef}
        >

          <div className="selection-box">
            <label>Language</label>

            <div className="custom-dropdown">

              <button
                type="button"
                className={`dropdown-trigger ${languageOpen ? "open" : ""
                  }`}
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setVoiceOpen(false);
                }}
              >
                <span>
                  {languages.find(
                    (item) => item.value === language
                  )?.icon}
                </span>

                <span className="selected-text">
                  {languages.find(
                    (item) => item.value === language
                  )?.label}
                </span>

                <span className="dropdown-arrow">
                  {languageOpen ? "⌃" : "⌄"}
                </span>
              </button>

              {languageOpen && (
                <div className="dropdown-menu">

                  {languages.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      className={`dropdown-option ${language === item.value
                        ? "selected"
                        : ""
                        }`}
                      onClick={() => {
                        setLanguage(item.value);
                        setLanguageOpen(false);
                        setError("");
                      }}
                    >
                      <span className="option-icon">
                        {item.icon}
                      </span>

                      <span>{item.label}</span>

                      {language === item.value && (
                        <span className="check-mark">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}

                </div>
              )}

            </div>
          </div>

          <div className="selection-box"
            ref={voiceDropdownRef}>
            <label>Voice</label>

            <div className="custom-dropdown">

              <button
                type="button"
                className={`dropdown-trigger ${voiceOpen ? "open" : ""
                  }`}
                onClick={() => {
                  setVoiceOpen(!voiceOpen);
                  setLanguageOpen(false);
                }}
              >
                <span className="voice-icon">
                  ✦
                </span>

                <span className="selected-text">
                  {voice || "Select voice"}
                </span>

                <span className="dropdown-arrow">
                  {voiceOpen ? "⌃" : "⌄"}
                </span>
              </button>

              {voiceOpen && (
                <div className="dropdown-menu">

                  {voices.map((voiceName) => (
                    <button
                      type="button"
                      key={voiceName}
                      className={`dropdown-option ${voice === voiceName
                        ? "selected"
                        : ""
                        }`}
                      onClick={() => {
                        setVoice(voiceName);
                        setVoiceOpen(false);
                        setError("");
                      }}
                    >
                      <span className="option-icon voice-option-icon">
                        ✦
                      </span>

                      <span>{voiceName}</span>

                      {voice === voiceName && (
                        <span className="check-mark">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}

                </div>
              )}

            </div>
          </div>

        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}
        <div className={`speech-status ${loading
          ? "status-generating"
          : audioUrl
            ? "status-success"
            : "status-ready"
          }`}>
          <span className="status-dot"></span>

          <span>
            {loading
              ? "Generating speech..."
              : audioUrl
                ? "Speech generated successfully"
                : "Ready to generate"}
          </span>
        </div>
        <button
          className={`generate-button ${loading ? "generating" : ""}`}
          onClick={generateSpeech}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Generating Speech...
            </>
          ) : (
            <>
              <span>🔊</span>
              Generate Speech
            </>
          )}
        </button>

        {audioUrl && (
          <div className="audio-section">

            <div className="audio-success-icon">
              ✓
            </div>

            <div className="audio-heading">
              <h3>Your Speech is Ready!</h3>

              <p>
                Your text has been successfully converted into speech.
              </p>
            </div>

            <div className="audio-player-wrapper">
              <div className="audio-label">
                <span>🎧</span>
                <span>Generated Audio</span>
              </div>

              <audio
                controls
                src={audioUrl}
              />
            </div>

            <a
              href={audioUrl.replace("/audio/", "/download/")}
              className="download-button"
            >
              <span>↓</span>
              Download Audio
            </a>
            <button
              type="button"
              className="new-speech-button"
              onClick={resetSpeech}
            >
              <span>＋</span>
              New Speech
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;