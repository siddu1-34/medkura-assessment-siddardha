const express = require("express");

const router = express.Router();

router.post("/summarise", async (req, res) => {

  const { report } = req.body;

  if (!report) {
    return res.status(400).json({
      error: "Medical report text required"
    });
  }

  /*
  SYSTEM PROMPT (used when Claude API key is available)

  const systemPrompt = `
  You are a clinical assistant at MedKura Health.

  You will receive a patient's medical report or discharge summary.

  Extract and return ONLY valid JSON in this exact structure:

  {
    "keyFindings": "...",
    "currentMedications": ["...", "..."],
    "redFlags": ["...", "..."],
    "patientQuery": "...",
    "suggestedSpecialist": "..."
  }

  Be concise. Use plain language a non-medical person can understand.
  If a field is not mentioned in the report, return null.
  `;
  */

  try {

    /*
    Since the Claude API key is not provided in the assessment,
    we simulate the AI response using a mock summary.
    */

    const aiSummary = {
      keyFindings: "Patient shows symptoms consistent with knee osteoarthritis causing chronic pain and limited mobility.",

      currentMedications: [
        "Ibuprofen",
        "Paracetamol"
      ],

      redFlags: [
        "Chronic joint pain",
        "Reduced knee mobility"
      ],

      patientQuery:
        "Patient is seeking a second opinion regarding knee replacement surgery.",

      suggestedSpecialist:
        "Orthopedic Surgeon"
    };

    res.json(aiSummary);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "AI summarisation failed"
    });

  }

});

module.exports = router;