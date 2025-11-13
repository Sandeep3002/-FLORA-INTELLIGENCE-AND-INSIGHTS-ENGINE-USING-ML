// src/components/analysis/CropRecommendation.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BeakerIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  CloudIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

function CropRecommendation() {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const inputFields = [
    {
      name: "N",
      label: "Nitrogen (N)",
      tooltip: "Nitrogen content in soil (0-140 mg/kg)",
      icon: BeakerIcon,
      min: 0,
      max: 140,
      unit: "mg/kg",
    },
    {
      name: "P",
      label: "Phosphorus (P)",
      tooltip: "Phosphorus content in soil (5-145 mg/kg)",
      icon: BeakerIcon,
      min: 5,
      max: 145,
      unit: "mg/kg",
    },
    {
      name: "K",
      label: "Potassium (K)",
      tooltip: "Potassium content in soil (5-205 mg/kg)",
      icon: BeakerIcon,
      min: 5,
      max: 205,
      unit: "mg/kg",
    },
    {
      name: "temperature",
      label: "Temperature",
      tooltip: "Average temperature (8-44°C)",
      icon: SunIcon,
      min: 8,
      max: 44,
      unit: "°C",
    },
    {
      name: "humidity",
      label: "Humidity",
      tooltip: "Relative humidity percentage (14-100%)",
      icon: CloudIcon,
      min: 14,
      max: 100,
      unit: "%",
    },
    {
      name: "ph",
      label: "pH Level",
      tooltip: "Soil pH level (3.5-10)",
      icon: BeakerIcon,
      min: 3.5,
      max: 10,
      unit: "",
    },
    {
      name: "rainfall",
      label: "Rainfall",
      tooltip: "Average rainfall (20-300 mm)",
      icon: CloudIcon,
      min: 20,
      max: 300,
      unit: "mm",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValueInRange = (name, value) => {
    const field = inputFields.find((f) => f.name === name);
    const numValue = parseFloat(value);
    return !value || (numValue >= field.min && numValue <= field.max);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate all inputs
    const invalidFields = Object.entries(formData).filter(
      ([name, value]) => !isValueInRange(name, value)
    );

    if (invalidFields.length > 0) {
      setError("Please ensure all values are within the specified ranges.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/crop-recommendation/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Prediction failed");
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
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
            Crop Recommendation
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Enter soil parameters to get crop recommendations
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Form Section */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {inputFields.map((field) => (
                  <div key={field.name} className="relative">
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <field.icon className="w-4 h-4" />
                        {field.label}
                        <div className="group relative">
                          <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
                            {field.tooltip}
                          </div>
                        </div>
                      </div>
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      step="any"
                      className={`mt-1 block w-full rounded-md ${
                        darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-gray-900 border-gray-300"
                      } border shadow-sm focus:border-green-500 focus:ring-green-500
                        ${
                          formData[field.name] &&
                          !isValueInRange(field.name, formData[field.name])
                            ? "border-red-500"
                            : ""
                        }`}
                      required
                    />
                    {formData[field.name] &&
                      !isValueInRange(field.name, formData[field.name]) && (
                        <p className="mt-1 text-sm text-red-500">
                          Value should be between {field.min} and {field.max}{" "}
                          {field.unit}
                        </p>
                      )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } 
                    transition-colors duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" />
                      Getting Recommendations...
                    </div>
                  ) : (
                    "Get Recommendations"
                  )}
                </button>
              </form>

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
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl`}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <ArrowPathIcon className="w-8 h-8 text-green-500 animate-spin" />
                  <p className="mt-4 text-gray-500">Analyzing parameters...</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Input Summary */}
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-semibold mb-4 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Input Parameters Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {inputFields.map((field) => (
                        <div key={field.name} className="text-center">
                          <div
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {field.label}
                          </div>
                          <div
                            className={`text-lg font-semibold ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {formData[field.name]} {field.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Recommendation */}
                  <div className="flex items-center gap-4">
                    <BeakerIcon className="w-8 h-8 text-green-500" />
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {result.primary_recommendation}
                      </h3>
                      <p className="text-green-500">
                        {result.confidence.toFixed(2)}% confidence
                      </p>
                    </div>
                  </div>

                  {/* All Recommendations */}
                  <div className="space-y-4">
                    {result.all_recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <h4
                          className={`font-semibold mb-2 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          {rec.crop}
                        </h4>
                        <p className="text-green-500 mb-2">
                          Probability: {rec.probability.toFixed(2)}%
                        </p>

                        {rec.info && (
                          <div className="space-y-2">
                            <p
                              className={
                                darkMode ? "text-gray-300" : "text-gray-600"
                              }
                            >
                              {rec.info.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h5
                                  className={`font-medium ${
                                    darkMode ? "text-gray-200" : "text-gray-700"
                                  }`}
                                >
                                  Growing Season
                                </h5>
                                <p className="text-gray-500">
                                  {rec.info.growing_season}
                                </p>
                              </div>
                              <div>
                                <h5
                                  className={`font-medium ${
                                    darkMode ? "text-gray-200" : "text-gray-700"
                                  }`}
                                >
                                  Water Requirements
                                </h5>
                                <p className="text-gray-500">
                                  {rec.info.water_requirements}
                                </p>
                              </div>
                            </div>

                            {rec.info.care_instructions && (
                              <div>
                                <h5
                                  className={`font-medium mb-2 ${
                                    darkMode ? "text-gray-200" : "text-gray-700"
                                  }`}
                                >
                                  Care Instructions
                                </h5>
                                <ul className="space-y-1">
                                  {rec.info.care_instructions.map(
                                    (instruction, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-center gap-2"
                                      >
                                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                        <span
                                          className={
                                            darkMode
                                              ? "text-gray-300"
                                              : "text-gray-600"
                                          }
                                        >
                                          {instruction}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <BeakerIcon className="w-12 h-12 mb-4" />
                  <p>Enter parameters to get crop recommendations</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropRecommendation;
