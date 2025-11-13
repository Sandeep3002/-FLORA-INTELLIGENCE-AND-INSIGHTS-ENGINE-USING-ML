// src/components/analysis/SoilAnalysis.jsx

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BeakerIcon,
  CloudIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

function SoilAnalysis() {
  const { darkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const analyzeSoil = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:5001/api/soil-analysis/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Analysis failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message || "Failed to analyze soil");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        analyzeSoil(file);
      } else {
        setError("Please select an image file");
      }
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Soil Analysis
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Upload a soil image to analyze its type and characteristics
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Upload Section */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                p-6 rounded-xl
                ${darkMode ? "bg-gray-800" : "bg-white"}
                shadow-xl
              `}
            >
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-6 cursor-pointer
                  ${darkMode ? "border-gray-600" : "border-gray-300"}
                  hover:border-green-500 transition-colors
                `}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />

                {!selectedImage ? (
                  <div className="flex flex-col items-center">
                    <ArrowUpTrayIcon className="w-12 h-12 text-gray-400" />
                    <p className="mt-4 text-center text-sm text-gray-500">
                      Click or drag to upload soil image
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Selected soil"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-lg"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-500/10 text-red-500"
                >
                  <ExclamationCircleIcon className="w-5 h-5 inline mr-2" />
                  {error}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Results Section */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                p-6 rounded-xl
                ${darkMode ? "bg-gray-800" : "bg-white"}
                shadow-xl
              `}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <ArrowPathIcon className="w-8 h-8 text-green-500 animate-spin" />
                  <p className="mt-4 text-gray-500">Analyzing soil...</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Soil Type */}
                  <div className="flex items-center gap-4">
                    <BeakerIcon className="w-8 h-8 text-green-500" />
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {result.soil_type}
                      </h3>
                      <p className="text-green-500">
                        {result.confidence.toFixed(2)}% confidence
                      </p>
                    </div>
                  </div>

                  {/* Characteristics */}
                  {result.characteristics && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Properties */}
                        <div
                          className={`p-4 rounded-lg ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <h4
                            className={`font-semibold mb-2 ${
                              darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            Properties
                          </h4>
                          {Object.entries(
                            result.characteristics.properties
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-1"
                            >
                              <span className="text-gray-500">{key}</span>
                              <span
                                className={
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }
                              >
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Suitable Crops */}
                        <div
                          className={`p-4 rounded-lg ${
                            darkMode ? "bg-gray-700" : "bg-gray-50"
                          }`}
                        >
                          <h4
                            className={`font-semibold mb-2 ${
                              darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                          >
                            Suitable Crops
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.characteristics.suitable_crops.map(
                              (crop) => (
                                <span
                                  key={crop}
                                  className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-sm"
                                >
                                  {crop}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <h4
                          className={`font-semibold mb-2 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {result.characteristics.recommendations.map(
                            (rec, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                <span
                                  className={
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }
                                >
                                  {rec}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <BeakerIcon className="w-12 h-12 mb-4" />
                  <p>Upload an image to analyze soil type</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoilAnalysis;
