// frontend/src/components/analysis/YieldPrediction.jsx

import React, { useState } from "react";

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    area: "",
    crop: "",
    year: new Date().getFullYear(),
    rainfall: "",
    pesticides: "",
    temperature: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const areas = [
    "India",
    "Brazil",
    "Mexico",
    "Pakistan",
    "Australia",
    "Japan",
    "Indonesia",
    "South Africa",
    "Turkey",
    "Ecuador",
    "Canada",
    "Spain",
    "Colombia",
    "Argentina",
    "Dominican Republic",
    "Egypt",
    "Italy",
    "Morocco",
    "Bangladesh",
    "Iraq",
    "Germany",
    "Kazakhstan",
    "Cameroon",
    "Chile",
    "Kenya",
    "United Kingdom",
    "Burundi",
    "Mali",
    "Peru",
    "Rwanda",
    "Uganda",
    "Guatemala",
    "Honduras",
    "Burkina Faso",
    "El Salvador",
    "Haiti",
    "Madagascar",
    "Saudi Arabia",
    "Sri Lanka",
    "Zambia",
    "Zimbabwe",
  ].sort();

  const availableCrops = [
    "Potatoes",
    "Maize",
    "Wheat",
    "Rice, paddy",
    "Soybeans",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5001/api/yield-prediction/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      if (result.success) {
        setPrediction(result.data);
        // Smooth scroll to results
        document
          .getElementById("results-section")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-emerald-100 dark:border-emerald-900/30">
          <div className="px-8 py-10">
            {/* Header Section */}
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Crop Yield Prediction
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg">
                Enter your agricultural data to predict crop yield
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Area Selection */}
                <div className="relative group">
                  <label
                    htmlFor="area-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Area
                  </label>
                  <div className="relative">
                    <select
                      id="area-select"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                               focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                               shadow-sm transition-all duration-200 ease-in-out
                               hover:border-emerald-400 dark:hover:border-emerald-500"
                      required
                    >
                      <option value="">Select Area</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Crop Type Selection */}
                <div className="relative group">
                  <label
                    htmlFor="crop-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Crop Type
                  </label>
                  <div className="relative">
                    <select
                      id="crop-select"
                      name="crop"
                      value={formData.crop}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                               focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                               shadow-sm transition-all duration-200 ease-in-out
                               hover:border-emerald-400 dark:hover:border-emerald-500"
                      required
                    >
                      <option value="">Select Crop</option>
                      {availableCrops.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Year Input */}
                <div className="relative group">
                  <label
                    htmlFor="year-input"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Year
                  </label>
                  <input
                    id="year-input"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1980"
                    max="2050"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             shadow-sm transition-all duration-200 ease-in-out
                             hover:border-emerald-400 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Rainfall Input */}
                <div className="relative group">
                  <label
                    htmlFor="rainfall-input"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Average Rainfall (mm)
                  </label>
                  <input
                    id="rainfall-input"
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200"
                    min="0"
                    max="5000"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             shadow-sm transition-all duration-200 ease-in-out
                             hover:border-emerald-400 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Pesticides Input */}
                <div className="relative group">
                  <label
                    htmlFor="pesticides-input"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Pesticides (tonnes)
                  </label>
                  <input
                    id="pesticides-input"
                    type="number"
                    name="pesticides"
                    value={formData.pesticides}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="0"
                    max="1000000"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             shadow-sm transition-all duration-200 ease-in-out
                             hover:border-emerald-400 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Temperature Input */}
                <div className="relative group">
                  <label
                    htmlFor="temperature-input"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    Average Temperature (°C)
                  </label>
                  <input
                    id="temperature-input"
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="e.g., 25"
                    min="-20"
                    max="50"
                    step="0.1"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                             shadow-sm transition-all duration-200 ease-in-out
                             hover:border-emerald-400 dark:hover:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700
                           text-white text-lg font-semibold py-4 px-6 rounded-lg shadow-lg
                           transform transition duration-200 ease-in-out hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                           disabled:opacity-50 disabled:cursor-not-allowed
                           dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Predict Yield"
                  )}
                </button>
              </div>
            </form>
            {/* Error Display */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-md animate-fade-in">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-200">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Prediction Results */}
            {prediction && (
              <div
                id="results-section"
                className="mt-12 space-y-6 animate-fade-in"
              >
                {/* Main Results Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-emerald-100 dark:border-emerald-900/30">
                  <div className="px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Prediction Results
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          Analysis based on provided parameters
                        </p>
                      </div>
                      <div
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 
                                    rounded-lg p-4 border border-emerald-100 dark:border-emerald-800"
                      >
                        <span className="block text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          Predicted Yield
                        </span>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                            {prediction.yield.toFixed(2)}
                          </span>
                          <span className="ml-1 text-sm text-emerald-600 dark:text-emerald-400">
                            hg/ha
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Parameters Summary */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Input Parameters Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(formData).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                      >
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/_/g, " ")}:
                        </span>
                        <span className="block text-gray-900 dark:text-white font-medium">
                          {value}{" "}
                          {key === "temperature"
                            ? "°C"
                            : key === "rainfall"
                            ? "mm"
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-emerald-100 dark:border-emerald-900/30">
                  <div className="px-6 py-8">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Recommendations & Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prediction.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-gradient-to-r from-emerald-50 to-teal-50 
                                   dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg
                                   transform transition-all duration-300 hover:scale-102 hover:shadow-md"
                        >
                          <span className="flex-shrink-0 h-6 w-6 text-emerald-500 dark:text-emerald-400">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span className="ml-3 text-gray-700 dark:text-gray-200">
                            {rec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-500 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Note
                      </h4>
                      <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                        This prediction is based on historical data and current
                        input parameters. Actual yield may vary based on
                        additional factors such as soil quality, farming
                        practices, and local weather conditions. Consider
                        consulting with local agricultural experts for more
                        specific guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
