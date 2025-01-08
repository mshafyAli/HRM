// src/pages/ResumeAnalysis.jsx
import  { useState } from "react";
import axios from "axios";

const ResumeAnalysis = () => {
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      // Convert resume to text (assuming the resume is in PDF format)
      const resumeText = await convertResumeToText(resume);

      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `Analyze the following resume and provide details about the person's name, skills, experience, education, and a brief summary:\n\n${resumeText}`,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data.choices[0].text);
    } catch (err) {
      setError(
        "An error occurred while analyzing the resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const convertResumeToText = async (file) => {
    // Function to convert resume PDF to text
    // For simplicity, this is a mock function. Implement actual PDF to text conversion logic here.
    return "Sample resume text for AI analysis";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Resume Analysis
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resume"
            >
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Analysis Result
            </h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
