"use client";

import { useState } from "react";

export default function ProjectForm({ setHistory, setSelected }) {
  const [branch, setBranch] = useState("");
  const [skills, setSkills] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const generateProject = async () => {
    if (!branch || !skills || !time) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch, skills, time }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate project");
      }

      const newProject = {
        title: `${branch} Project`,
        content: data.project?.result || "Project generated successfully!",
        _id: data.project?._id,
        branch: data.project?.branch,
        skills: data.project?.skills,
        time: data.project?.time,
      };

      setHistory((prev) => [newProject, ...prev]);
      setSelected(newProject);

      // Clear form
      setBranch("");
      setSkills("");
      setTime("");
    } catch (error) {
      console.error("Error generating project:", error);
      alert(error.message || "Failed to generate project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Generate Your Project Idea ✨
        </h2>
        <p className="text-gray-600">Fill in the details below to get AI-powered project suggestions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🎓 Branch
          </label>
          <input
            className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 p-3 rounded-xl transition-all duration-300 outline-none bg-white/50 text-gray-900 placeholder-gray-400"
            placeholder="e.g., CSE, ECE, IT..."
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            💻 Skills
          </label>
          <input
            className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 p-3 rounded-xl transition-all duration-300 outline-none bg-white/50 text-gray-900 placeholder-gray-400"
            placeholder="e.g., React, Python, ML..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ⏰ Time Available
          </label>
          <input
            className="w-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 p-3 rounded-xl transition-all duration-300 outline-none bg-white/50 text-gray-900 placeholder-gray-400"
            placeholder="e.g., 2 months, 6 weeks..."
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={generateProject}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Magic...
          </span>
        ) : (
          "🚀 Generate with ProjectGenie"
        )}
      </button>
    </div>
  );
}