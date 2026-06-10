import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { askGemini } from "../services/gemini";

function CareerAssistant() {

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    try {

      setLoading(true);
      setAnswer("");

      const response = await askGemini(question);

      setAnswer(response);

    } catch (error) {

      console.error("Gemini Error:", error);

      setAnswer(
        "Error: " +
        (error.message || "Unable to get AI response")
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f1f5f9"
      }}
    >

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ← Back To Dashboard
      </button>

      <h1
        style={{
          marginBottom: "20px",
          color: "#1e293b"
        }}
      >
        🤖 AI Career Assistant
      </h1>

      <textarea
        rows="6"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask anything about careers, Java, React, Spring Boot, interviews..."
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          fontSize: "16px"
        }}
      />

      <br />
      <br />

      <button
        onClick={askAI}
        disabled={loading}
        style={{
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <br />
      <br />

      <h3 style={{ color: "#1e293b" }}>
        Response
      </h3>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minHeight: "120px",
          whiteSpace: "pre-wrap"
        }}
      >
        {answer}
      </div>

    </div>
  );
}

export default CareerAssistant;