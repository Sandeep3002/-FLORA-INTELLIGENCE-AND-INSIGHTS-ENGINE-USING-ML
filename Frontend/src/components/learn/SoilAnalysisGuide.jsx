// src/components/learn/SoilAnalysisGuide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import SoilAnalysis from "../analysis/SoilAnalysis";
import {
  BeakerIcon,
  CameraIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChartBarIcon,
  PhotoIcon,
  ArrowPathIcon,
  LightBulbIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline";

// Animated Background Pattern
const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/5"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Interactive Feature Card
const FeatureCard = ({ title, description, icon: Icon, gradient, index }) => {
  const { darkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        rotateY: 5,
        rotateX: -5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl p-6 ${
        darkMode ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm border border-emerald-500/10 transform-gpu`}
    >
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        style={{ opacity: 0.1 }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{
            rotateZ: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient}
            flex items-center justify-center mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <h3
          className={`text-lg font-semibold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Soil Type Card
const SoilTypeCard = ({ type, characteristics, icon: Icon, color }) => {
  const { darkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm border border-emerald-500/10`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {type}
          </h3>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "2.5rem" }}
            className="overflow-hidden"
          >
            <p
              className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {characteristics}
            </p>
          </motion.div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-emerald-500 text-sm font-medium hover:text-emerald-600"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SoilAnalysisGuide = () => {
  const { darkMode } = useTheme();
  const [showDemo, setShowDemo] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const features = [
    {
      title: "Visual Analysis",
      description: "Advanced image processing for soil type identification",
      icon: CameraIcon,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Composition Details",
      description: "Get detailed breakdown of soil composition",
      icon: BeakerIcon,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Recommendations",
      description: "Receive tailored soil management suggestions",
      icon: DocumentTextIcon,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const soilTypes = [
    {
      type: "Alluvial Soil",
      characteristics:
        "Rich in nutrients, formed by river deposits. Excellent for most crops due to good drainage and organic content.",
      icon: MapIcon,
      color: "bg-amber-500",
    },
    {
      type: "Black Soil",
      characteristics:
        "High clay content, moisture retentive. Ideal for cotton, wheat, and oilseeds cultivation.",
      icon: BeakerIcon,
      color: "bg-gray-800",
    },
    {
      type: "Red Soil",
      characteristics:
        "Rich in iron oxides, well-drained. Suitable for groundnuts, potato, and citrus fruits.",
      icon: MapIcon,
      color: "bg-red-500",
    },
    {
      type: "Clay Soil",
      characteristics:
        "Dense, heavy, and nutrient-rich. Good for rice cultivation and water-intensive crops.",
      icon: BeakerIcon,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <BackgroundPattern />

        <div className="relative p-6 md:p-8">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center 
                justify-between gap-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 
                    rounded-full bg-emerald-500/10 text-emerald-500"
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    AI-Powered Analysis
                  </span>
                </motion.div>

                <h1
                  className={`text-3xl md:text-4xl font-bold ${
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
                  Identify soil types and get detailed composition analysis
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(!showDemo)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 
                  to-teal-500 text-white font-medium shadow-lg hover:shadow-xl 
                  transition-all duration-300 flex items-center space-x-2"
              >
                <PhotoIcon className="w-5 h-5" />
                <span>{showDemo ? "Hide Demo" : "Try Demo"}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Live Preview Section */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-6 px-4 md:px-6 max-h-[500px] overflow-auto">
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
                    <SoilAnalysis previewMode={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            step: 1,
            title: "Capture Image",
            description: "Take clear photos of soil sample",
            icon: CameraIcon,
          },
          {
            step: 2,
            title: "Analysis",
            description: "AI processes soil characteristics",
            icon: ArrowPathIcon,
          },
          {
            step: 3,
            title: "Results",
            description: "Get detailed soil analysis",
            icon: ChartBarIcon,
          },
        ].map((step) => (
          <motion.div
            key={step.step}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl transition-all duration-300 ${
              activeStep === step.step
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                : darkMode
                ? "bg-gray-800/50"
                : "bg-white/50"
            }`}
            onClick={() => setActiveStep(step.step)}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === step.step ? "bg-white/20" : "bg-emerald-500/10"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 ${
                    activeStep === step.step ? "text-white" : "text-emerald-500"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-semibold ${
                    activeStep === step.step
                      ? "text-white"
                      : darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    activeStep === step.step
                      ? "text-white/80"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Soil Types */}
      <div className="space-y-4">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Soil Types
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {soilTypes.map((soil, index) => (
            <SoilTypeCard key={index} {...soil} />
          ))}
        </div>
      </div>

      {/* Current Capabilities */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border border-emerald-500/10`}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <LightBulbIcon className="w-6 h-6 text-emerald-500" />
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Current Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Analysis Accuracy", value: "75%" },
              { label: "Soil Types", value: "4" },
              { label: "Processing Time", value: "~3s" },
            ].map((metric, index) => (
              <div key={index} className="text-center p-4">
                <div
                  className={`text-2xl font-bold mb-1 
                  bg-gradient-to-r from-emerald-500 to-teal-500 
                  text-transparent bg-clip-text`}
                >
                  {metric.value}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Best Practices */}
      <div
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border border-emerald-500/10`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Ensure proper lighting conditions",
            "Remove debris from soil sample",
            "Take multiple sample photos",
            "Include size reference in image",
          ].map((practice, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {practice}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysisGuide;
