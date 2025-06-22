import React, { useState } from "react";
import './App.css';

function App() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/generate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea })
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>💡 GPT GitHub Bot Dashboard</h1>
      <textarea
        placeholder="Describe your idea here..."
        rows="5"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Code"}
      </button>

      {response && (
        <div className="response">
          <h3>🧠 LLM Response</h3>
          <pre>{response.explanation}</pre>
          <h4>📄 Code</h4>
          <pre>{response.code}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
