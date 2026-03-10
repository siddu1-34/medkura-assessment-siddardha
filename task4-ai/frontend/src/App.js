import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [report, setReport] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!report) {
      alert("Please paste the medical report");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5001/api/summarise",
        { report }
      );

      setResult(res.data);

      setLoading(false);

    } catch (error) {

      setLoading(false);
      alert("AI processing failed");

    }

  };

  return (

    <div className="app">

      <h1>Medical Report AI Summariser</h1>

      <p>
        Paste a patient medical report to generate an AI summary
      </p>

      <textarea
        placeholder="Paste medical report here..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Generate Summary
      </button>

      {loading && <p>Processing report with AI...</p>}

      {result && (

        <div className="result">

          <h3>Key Findings</h3>
          <p>{result.keyFindings}</p>

          <h3>Current Medications</h3>
          <ul>
            {result.currentMedications?.map((med, i) => (
              <li key={i}>{med}</li>
            ))}
          </ul>

          <h3>Red Flags</h3>
          <ul>
            {result.redFlags?.map((flag, i) => (
              <li key={i}>{flag}</li>
            ))}
          </ul>

          <h3>Patient Query</h3>
          <p>{result.patientQuery}</p>

          <h3>Suggested Specialist</h3>
          <p>{result.suggestedSpecialist}</p>

        </div>

      )}

    </div>

  );

}

export default App;