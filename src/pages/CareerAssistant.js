import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CareerAssistant() {

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = () => {

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setAnswer(
      "AI Assistant Response: " + question
    );
  };

  return (

    <div style={{ padding: "30px" }}>

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

      <h1>🤖 AI Career Assistant</h1>

      <textarea
        rows="5"
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
        placeholder="Ask a career question..."
      />

      <br />
      <br />

      <button
        onClick={askAI}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Ask AI
      </button>

      <br />
      <br />

      <h3>Response</h3>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        {answer}
      </div>

    </div>

  );
}

export default CareerAssistant;