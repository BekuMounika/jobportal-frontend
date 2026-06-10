import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "../services/gemini";

function CareerAssistant() {

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const askAI = async () => {

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentQuestion
      }
    ]);

    setQuestion("");

    try {

      setLoading(true);

      const response =
        await askGemini(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Failed to get AI response."
        }
      ]);

    } finally {

      setLoading(false);

    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto"
      }}
    >

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Back To Dashboard
      </button>

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        🤖 AI Career Assistant
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          minHeight: "450px",
          maxHeight: "550px",
          overflowY: "auto",
          marginBottom: "20px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >

        {messages.length === 0 && (
          <div
            style={{
              color: "#64748b",
              fontSize: "18px"
            }}
          >
            Ask anything about Java,
            React, Spring Boot,
            Interview Preparation,
            Career Guidance...
          </div>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "15px"
            }}
          >

            <div
              style={{
                background:
                  msg.sender === "user"
                    ? "#2563eb"
                    : "#f1f5f9",

                color:
                  msg.sender === "user"
                    ? "white"
                    : "#111827",

                padding: "15px",

                borderRadius: "15px",

                maxWidth:
                  msg.sender === "user"
                    ? "70%"
                    : "85%",

                lineHeight: "1.8",

                whiteSpace: "pre-wrap",

                fontSize: "15px",

                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >

              {msg.text}

            </div>

          </div>

        ))}

        {loading && (

          <div
            style={{
              marginTop: "10px",
              color: "#2563eb",
              fontWeight: "bold"
            }}
          >
            🤖 Thinking...
          </div>

        )}

      </div>

      <textarea
        rows="4"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask your question..."
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "16px"
        }}
      />

      <br />
      <br />

      <button
        onClick={askAI}
        style={{
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px"
        }}
      >
        Ask AI
      </button>

      &nbsp;&nbsp;

      <button
        onClick={clearChat}
        style={{
          padding: "12px 25px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px"
        }}
      >
        Clear Chat
      </button>

    </div>

  );
}

export default CareerAssistant;