// src/components/learn/YieldPredictionGuide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import YieldPrediction from "../analysis/YieldPrediction";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CloudIcon,
  BeakerIcon,
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const FeatureCard = ({ title, description, icon: Icon, gradient }) => {
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
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10`}
      />
      <div className="relative z-10">
        <div
          className={`p-3 rounded-lg bg-gradient-to-r ${gradient} 
          w-fit mb-4`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
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

const ParameterCard = ({ title, description, icon: Icon }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg ${
        darkMode ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <Icon className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h4
            className={`font-medium ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h4>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const YieldPredictionGuide = () => {
  const { darkMode } = useTheme();
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      title: "Data Analysis",
      description: "Process historical yield data to improve predictions",
      icon: ChartBarIcon,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Weather Data",
      description: "Consider local climate patterns for better accuracy",
      icon: CloudIcon,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Soil Factors",
      description: "Include soil conditions in yield calculations",
      icon: BeakerIcon,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const parameters = [
    {
      title: "Area Selection",
      description: "Specify your farming area",
      icon: MapPinIcon,
    },
    {
      title: "Season",
      description: "Choose growing period",
      icon: CalendarIcon,
    },
    {
      title: "Conditions",
      description: "Input weather and soil data",
      icon: CloudIcon,
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
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -right-10 -top-10 w-40 h-40 
              bg-emerald-500/10 rounded-full blur-3xl"
            />
            <div
              className="absolute -left-10 -bottom-10 w-40 h-40 
              bg-teal-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center 
                justify-between gap-6"
            >
              <div className="space-y-4">
                <div
                  className="inline-flex items-center space-x-2 px-4 py-2 
                  rounded-full bg-emerald-500/10 text-emerald-500"
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    AI-Powered Predictions
                  </span>
                </div>
                <h1
                  className={`text-3xl md:text-4xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Crop Yield Prediction
                </h1>
                <p
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Make informed decisions with our yield prediction model
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
                <ArrowTrendingUpIcon className="w-5 h-5" />
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
                    <YieldPrediction previewMode={true} />
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
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      {/* Parameters Section */}
      <div className="space-y-4">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Input Parameters
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {parameters.map((param, index) => (
            <ParameterCard key={index} {...param} />
          ))}
        </div>
      </div>

      {/* Accuracy Metrics */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`p-6 rounded-xl ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border border-emerald-500/10`}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="w-6 h-6 text-emerald-500" />
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Current Progress
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Model Accuracy", value: "75%" },
              { label: "Test Cases", value: "100+" },
              { label: "Supported Crops", value: "5" },
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
            "Keep environmental data up to date",
            "Input accurate historical data",
            "Consider seasonal changes",
            "Verify data before prediction",
          ].map((practice, index) => (
            <div key={index} className="flex items-center space-x-3">
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

export default YieldPredictionGuide;
