// src/components/analysis/DiseaseDetection.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";


function DiseaseDetection() {
  const { darkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
        setResult(null);
      } else {
        setError("Please select an image file");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    } else {
      setError("Please drop an image file");
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(
        "http://localhost:5001/api/disease-detection/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      console.log("Full response:", data);

      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
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
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Plant Disease Detection
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Upload a plant image to detect diseases and get treatment
            recommendations
          </p>
        </motion.div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`
              p-8 rounded-xl text-center
              ${darkMode ? "bg-gray-800" : "bg-white"}
              ${
                darkMode
                  ? "shadow-xl shadow-black/20"
                  : "shadow-xl shadow-gray-200/50"
              }
            `}
          >
            {!selectedImage ? (
              // Upload Zone
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  border-2 border-dashed rounded-xl p-8
                  ${
                    darkMode
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-300 hover:border-gray-400"
                  }
                  transition-colors duration-300
                  cursor-pointer
                `}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <ArrowUpTrayIcon
                  className={`
                  w-12 h-12 mx-auto mb-4
                  ${darkMode ? "text-gray-400" : "text-gray-500"}
                `}
                />
                <p
                  className={`
                  text-lg mb-2
                  ${darkMode ? "text-gray-300" : "text-gray-600"}
                `}
                >
                  Drag and drop an image here, or click to select
                </p>
                <p
                  className={`
                  text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-500"}
                `}
                >
                  Supported formats: JPG, PNG
                </p>
              </div>
            ) : (
              // Image Preview and Analysis Section
              <div>
                <div className="relative mb-6">
                  <img
                    src={previewUrl}
                    alt="Selected plant"
                    className="max-h-96 mx-auto rounded-lg"
                  />
                  <button
                    onClick={handleReset}
                    className={`
                      absolute top-2 right-2 p-2 rounded-full
                      ${darkMode ? "bg-gray-700" : "bg-gray-100"}
                      hover:opacity-80 transition-opacity
                    `}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`
                    w-full py-3 px-4 rounded-lg
                    flex items-center justify-center
                    font-medium text-white
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }
                    transition-colors duration-300
                  `}
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-lg bg-red-50 text-red-600"
              >
                <ExclamationCircleIcon className="w-5 h-5 inline mr-2" />
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <h2
                  className={`
      text-xl font-bold mb-6 flex items-center
      ${darkMode ? "text-white" : "text-gray-900"}
    `}
                >
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                  Analysis Results
                </h2>

                {/* Primary Diagnosis */}
                {result.primary_diagnosis && (
                  <div
                    className={`
        mb-6 p-6 rounded-xl border-2
        ${
          darkMode
            ? "bg-gray-800 border-green-500/30"
            : "bg-white border-green-500"
        }
      `}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className={`
            text-lg font-semibold
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
                      >
                        {result.primary_diagnosis.disease}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span
                          className={`
              px-3 py-1 rounded-full text-sm font-medium mb-2
              ${
                darkMode
                  ? "bg-green-900/30 text-green-300"
                  : "bg-green-100 text-green-800"
              }
            `}
                        >
                          {result.primary_diagnosis.confidence}% Confidence
                        </span>
                        <span
                          className={`
              text-sm
              ${
                result.urgency === "high"
                  ? "text-red-500"
                  : result.urgency === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }
            `}
                        >
                          {result.urgency.charAt(0).toUpperCase() +
                            result.urgency.slice(1)}{" "}
                          Priority
                        </span>
                      </div>
                    </div>

                    <p
                      className={`
          text-lg mb-4
          ${darkMode ? "text-gray-300" : "text-gray-600"}
        `}
                    >
                      {result.primary_diagnosis.recommendation_summary}
                    </p>

                    {/* Details from all_predictions */}
                    {result.all_predictions?.length > 0 &&
                      result.all_predictions[0].details && (
                        <div className="space-y-6">
                          {/* Disease Information */}
                          <div>
                            <h4
                              className={`
                font-medium mb-2
                ${darkMode ? "text-gray-200" : "text-gray-700"}
              `}
                            >
                              About this Condition
                            </h4>
                            <p
                              className={`
                ${darkMode ? "text-gray-300" : "text-gray-600"}
              `}
                            >
                              {result.all_predictions[0].details.description}
                            </p>
                          </div>

                          {/* Treatments */}
                          {result.all_predictions[0].details.treatments && (
                            <div>
                              <h4
                                className={`
                  font-medium mb-2
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
                              >
                                Recommended Treatments
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {result.all_predictions[0].details.treatments.map(
                                  (treatment, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                      <span
                                        className={`
                        text-sm
                        ${darkMode ? "text-gray-300" : "text-gray-600"}
                      `}
                                      >
                                        {treatment}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Prevention */}
                          {result.all_predictions[0].details.prevention && (
                            <div>
                              <h4
                                className={`
                  font-medium mb-2
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
                              >
                                Prevention Tips
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {result.all_predictions[0].details.prevention.map(
                                  (tip, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                      <span
                                        className={`
                        text-sm
                        ${darkMode ? "text-gray-300" : "text-gray-600"}
                      `}
                                      >
                                        {tip}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                          {/* Environmental Factors */}
                          {result.all_predictions[0].details
                            .environmental_factors && (
                            <div
                              className={`
                mt-4 p-4 rounded-lg
                ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}
              `}
                            >
                              <h4
                                className={`
                  font-medium mb-3
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
                              >
                                Optimal Growing Conditions
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {Object.entries(
                                  result.all_predictions[0].details
                                    .environmental_factors
                                ).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium block mb-1 capitalize">
                                      {key.replace("_", " ")}
                                    </span>
                                    <p
                                      className={`
                        text-sm
                        ${darkMode ? "text-gray-300" : "text-gray-600"}
                      `}
                                    >
                                      {value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                )}

                {/* Alternative Predictions */}
                {result.all_predictions &&
                  result.all_predictions.length > 1 && (
                    <div className="mt-6">
                      <h3
                        className={`
          text-lg font-semibold mb-4
          ${darkMode ? "text-gray-200" : "text-gray-700"}
        `}
                      >
                        Alternative Possibilities
                      </h3>
                      <div className="space-y-4">
                        {result.all_predictions
                          .slice(1)
                          .map((prediction, idx) => (
                            <div
                              key={idx}
                              className={`
                p-4 rounded-lg
                ${darkMode ? "bg-gray-800" : "bg-gray-50"}
              `}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span
                                  className={`
                  font-medium
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
                                >
                                  {prediction.disease}
                                </span>
                                <span
                                  className={`
                  text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-500"}
                `}
                                >
                                  {prediction.confidence}% confidence
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </motion.div>
            )}

            {/* Error Message remains the same */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;
