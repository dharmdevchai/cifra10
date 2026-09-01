"use client";

import { useState } from "react";

export default function ImageClassifier() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ class: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!file) return;

  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setResult(data);
  } catch (err) {
    console.error("Prediction failed", err);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload an image (Airplane, Car, Cat, Dog, etc.)
        </label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Upload preview" className="w-32 h-32 object-cover rounded-lg border shadow-sm" />
          </div>
        )}

        <button 
          type="submit" 
          disabled={!file || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Analyzing Image..." : "Classify Image"}
        </button>
      </form>

      {/* Dynamic Results Slot (Updates independently like a Youtube component) */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
          <h3 className="font-semibold text-lg text-gray-800">Prediction Results</h3>
          <p className="text-gray-600 capitalize">
            Predicted Class: <span className="font-bold text-blue-600">{result.class}</span>
          </p>
          <p className="text-gray-600">
            Confidence: <span className="font-bold text-gray-900">{result.confidence}%</span>
          </p>
        </div>
      )}
    </div>
  );
}
