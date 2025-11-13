// src/components/learn/DiseaseDetectionGuide.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  CameraIcon,
  CheckCircleIcon,
  LightBulbIcon,
  ArrowPathIcon,
  SparklesIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import DiseaseDetection from "../analysis/DiseaseDetection";

const InteractiveCard = ({ title, content, icon: Icon, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl p-6 ${
        darkMode ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm border border-emerald-500/10`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10`}
      />

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
        </div>
        <div
          className={`space-y-2 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {content}
        </div>
      </div>
    </motion.div>
  );
};

const ProcessStep = ({ number, title, description, isActive, onClick }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          : darkMode
          ? "bg-gray-800/50 hover:bg-gray-800"
          : "bg-white/50 hover:bg-white"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isActive ? "bg-white/20" : "bg-emerald-500/10"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              isActive ? "text-white" : "text-emerald-500"
            }`}
          >
            {number}
          </span>
        </div>
        <div>
          <h3
            className={`font-semibold ${
              isActive
                ? "text-white"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm mt-1 ${
              isActive
                ? "text-white/80"
                : darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const DiseaseDetectionPreview = ({ darkMode }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResult({
      disease: "Early Blight",
      confidence: "95%",
      recommendations: [
        "Apply appropriate fungicide",
        "Improve air circulation",
        "Remove affected leaves",
        "Monitor surrounding plants",
      ],
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={`rounded-xl ${
            darkMode ? "bg-gray-800/50" : "bg-white/50"
          } p-6 backdrop-blur-sm`}
        >
          <div
            className="aspect-square rounded-lg border-2 border-dashed border-emerald-500/20
              flex flex-col items-center justify-center cursor-pointer
              hover:border-emerald-500/40 transition-colors duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Selected plant"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center p-8">
                <CameraIcon className="w-12 h-12 mx-auto text-emerald-500/50 mb-4" />
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Click to upload plant image
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!selectedImage || isAnalyzing}
            className={`w-full mt-4 py-3 rounded-lg font-medium
              ${
                selectedImage
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } transition-all duration-300`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" />
                Analyzing...
              </div>
            ) : (
              "Analyze Image"
            )}
          </motion.button>
        </div>

        <div
          className={`rounded-xl ${
            darkMode ? "bg-gray-800/50" : "bg-white/50"
          } p-6 backdrop-blur-sm`}
        >
          {result ? (
            <div className="space-y-6">
              <div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Detection Result
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-500 font-medium">
                    {result.disease}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm
                    bg-emerald-500/10 text-emerald-500"
                  >
                    {result.confidence} confidence
                  </span>
                </div>
              </div>

              <div>
                <h4
                  className={`font-medium mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                      <span
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p
                className={`text-center ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Upload an image and click analyze to see detection results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DiseaseDetectionGuide = () => {
  const { darkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(1);
  const [showDemo, setShowDemo] = useState(false);

  const requirements = [
    {
      title: "Image Quality",
      items: [
        "High resolution (min. 1024x1024)",
        "Good lighting conditions",
        "Clear focus on affected area",
        "Multiple angles when possible",
      ],
    },
    {
      title: "Capture Guidelines",
      items: [
        "Avoid shadows and glare",
        "Include surrounding context",
        "Maintain proper distance",
        "Use macro mode for details",
      ],
    },
  ];

  const diseases = [
    {
      name: "Early Blight",
      accuracy: "95%",
      symptoms: "Brown spots with concentric rings",
      treatment: "Fungicide application, improve air circulation",
    },
    {
      name: "Powdery Mildew",
      accuracy: "92%",
      symptoms: "White powdery coating on leaves",
      treatment: "Sulfur-based fungicides, reduce humidity",
    },
    {
      name: "Bacterial Spot",
      accuracy: "88%",
      symptoms: "Dark, water-soaked lesions",
      treatment: "Copper-based sprays, crop rotation",
    },
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="relative p-8 md:p-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500">
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    AI-Powered Detection
                  </span>
                </div>
                <h1
                  className={`text-3xl md:text-4xl font-bold ${
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
                  Instantly identify plant diseases and get treatment
                  recommendations using our advanced AI model.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(!showDemo)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 
                  text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300
                  flex items-center space-x-2"
              >
                <CameraIcon className="w-5 h-5" />
                <span>{showDemo ? "Hide Demo" : "Try Demo"}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-8 px-4 md:px-8 max-h-[600px] overflow-auto">
                <div className="max-w-4xl mx-auto relative">
                  <div
                    style={{
                      transform: "scale(0.6)",
                      transformOrigin: "top center",
                      margin: "0 auto",
                      height: "fit-content",
                    }}
                    className="bg-transparent"
                  >
                    <DiseaseDetection previewMode={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            number: 1,
            title: "Capture Image",
            description: "Take clear photos of affected plant areas",
          },
          {
            number: 2,
            title: "AI Analysis",
            description: "Our model analyzes disease patterns",
          },
          {
            number: 3,
            title: "Get Results",
            description: "Receive diagnosis and treatment plans",
          },
        ].map((step) => (
          <ProcessStep
            key={step.number}
            {...step}
            isActive={activeStep === step.number}
            onClick={() => setActiveStep(step.number)}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {requirements.map((req, index) => (
          <InteractiveCard
            key={index}
            title={req.title}
            icon={CheckCircleIcon}
            gradient="from-emerald-500 to-teal-500"
            content={
              <ul className="space-y-2">
                {req.items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            }
          />
        ))}
      </div>

      <div className="space-y-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Detection Capabilities
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm border border-emerald-500/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {disease.name}
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium 
                  bg-emerald-500/10 text-emerald-500"
                >
                  {disease.accuracy}
                </span>
              </div>
              <div className="space-y-2">
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="font-medium">Symptoms:</span>{" "}
                  {disease.symptoms}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="font-medium">Treatment:</span>{" "}
                  {disease.treatment}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border border-emerald-500/10`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <LightBulbIcon className="w-6 h-6 text-yellow-500" />
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Pro Tips
          </h2>
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {[
            "Take multiple photos from different angles",
            "Compare with healthy plant parts",
            "Document the progression of symptoms",
            "Note environmental conditions",
          ].map((tip, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ArrowLongRightIcon className="w-5 h-5 text-emerald-500" />
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default DiseaseDetectionGuide;
