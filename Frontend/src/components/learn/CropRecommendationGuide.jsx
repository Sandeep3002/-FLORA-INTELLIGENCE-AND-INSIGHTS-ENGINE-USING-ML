// src/components/learn/CropRecommendationGuide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import CropRecommendation from "../analysis/CropRecommendation";
import {
  LightBulbIcon,
  SparklesIcon,
  BeakerIcon,
  ChartBarIcon,
  CloudIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

// Animated DNA Helix Background
const DNAHelix = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{ top: `${i * 10}%` }}
          animate={{
            x: ["-100%", "100%"],
            y: [0, 20, 0],
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" />
        </motion.div>
      ))}
    </div>
  );
};

// Parameter Card with Hover Effect
const ParameterCard = ({ title, description, range, unit, icon: Icon }) => {
  const { darkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

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
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Icon className="w-5 h-5 text-emerald-500" />
            </div>
            <h3
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          </div>
          <span className="text-sm text-emerald-500 font-medium">{unit}</span>
        </div>

        <p
          className={`text-sm mb-3 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        <div
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Range: {range}
        </div>
      </div>
    </motion.div>
  );
};

// Process Step Card
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

const CropRecommendationGuide = () => {
  const { darkMode } = useTheme();
  const [showDemo, setShowDemo] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const parameters = [
    {
      title: "Nitrogen (N)",
      description: "Essential for leaf growth and green vegetation",
      range: "0-140 kg/ha",
      unit: "kg/ha",
      icon: BeakerIcon,
    },
    {
      title: "Phosphorus (P)",
      description: "Crucial for root development and flowering",
      range: "5-145 kg/ha",
      unit: "kg/ha",
      icon: BeakerIcon,
    },
    {
      title: "Potassium (K)",
      description: "Important for overall plant health",
      range: "5-205 kg/ha",
      unit: "kg/ha",
      icon: BeakerIcon,
    },
    {
      title: "Temperature",
      description: "Ambient temperature for crop growth",
      range: "8-45°C",
      unit: "°C",
      icon: ChartBarIcon,
    },
    {
      title: "Humidity",
      description: "Atmospheric moisture level",
      range: "14-100%",
      unit: "%",
      icon: CloudIcon,
    },
    {
      title: "pH Level",
      description: "Soil acidity or alkalinity",
      range: "3.5-10",
      unit: "pH",
      icon: AdjustmentsHorizontalIcon,
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
        <DNAHelix />

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
                    AI-Powered Recommendations
                  </span>
                </motion.div>

                <h1
                  className={`text-3xl md:text-4xl font-bold ${
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
                  Get personalized crop suggestions based on soil and
                  environmental conditions
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
                <DocumentChartBarIcon className="w-5 h-5" />
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
                    <CropRecommendation previewMode={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            number: 1,
            title: "Input Parameters",
            description: "Enter soil and environmental data",
          },
          {
            number: 2,
            title: "Analysis",
            description: "AI processes input conditions",
          },
          {
            number: 3,
            title: "Recommendations",
            description: "Get suitable crop suggestions",
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

      {/* Parameters Grid */}
      <div className="space-y-4">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Input Parameters
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parameters.map((param, index) => (
            <ParameterCard key={index} {...param} />
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
              { label: "Recommendation Accuracy", value: "78%" },
              { label: "Supported Crops", value: "15+" },
              { label: "Analysis Time", value: "~2s" },
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
            "Use recent soil test results",
            "Consider seasonal variations",
            "Input accurate weather data",
            "Verify local conditions",
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

export default CropRecommendationGuide;
