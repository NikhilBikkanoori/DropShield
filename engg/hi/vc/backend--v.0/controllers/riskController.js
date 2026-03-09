// controllers/riskController.js
const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL;

const analyzeRisk = async (req, res) => {
  const { studentId } = req.body;
  // 1. Fetch student, parent etc.
  // const student = await StudentAdmin.findById(studentId).populate("Parent");
  // const parentId = student.Parent._id;

  // 2. Call ML model -> riskScore, riskLevel...
  // const { data: prediction } = await axios.post(`${ML_SERVICE_URL}/predict`, {...});

  // Example static values:
  const riskLevel = "HIGH";
  const parentId = "6767b71c2e8b7c2e9a2f0001"; // example

  // 3. If HIGH, create a notification
  if (riskLevel === "HIGH") {
    await axios.post("http://localhost:5000/api/notifications", {
      parentId,
      studentId,
      title: "High Risk Alert",
      message:
        "Your ward is showing signs of academic risk. Please log in to the portal and review the counseling suggestions.",
      type: "RISK_ALERT",
    });
  }

  res.json({ riskLevel });
};
