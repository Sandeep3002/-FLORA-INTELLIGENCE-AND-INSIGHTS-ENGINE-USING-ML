// src/pages/Learn.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  BookOpenIcon,
  AcademicCapIcon,
  BeakerIcon,
  ChartBarIcon,
  CameraIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

// Import active component
import DiseaseDetectionGuide from "../components/learn/DiseaseDetectionGuide";
import YieldPredictionGuide from "../components/learn/YieldPredictionGuide";

import SpeciesIdentificationGuide from "../components/learn/SpeciesIdentificationGuide";

import SoilAnalysisGuide from "../components/learn/SoilAnalysisGuide";
import CropRecommendationGuide from "../components/learn/CropRecommendationGuide";

const Learn = () => {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("disease");

  const sections = [
    {
      id: "disease",
      title: "Disease Detection",
      icon: CameraIcon,
      description: "Learn how to use our AI-powered disease detection system",
    },
    {
      id: "yield",
      title: "Yield Prediction",
      icon: ChartBarIcon,
      description: "Understand crop yield prediction parameters and analysis",
    },
    {
      id: "species",
      title: "Species Identification",
      icon: BeakerIcon,
      description: "Guide to plant species identification and classification",
    },
    {
      id: "soil",
      title: "Soil Analysis",
      icon: BeakerIcon,
      description: "Comprehensive guide to soil type analysis",
    },
    {
      id: "crop",
      title: "Crop Recommendation",
      icon: LightBulbIcon,
      description: "Learn about our crop recommendation system",
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "disease":
        return <DiseaseDetectionGuide />;

      case "yield":
        return <YieldPredictionGuide />;

      case "species":
        return <SpeciesIdentificationGuide />;

      case "soil":
        return <SoilAnalysisGuide />;

      case "crop":
        return <CropRecommendationGuide />;
      default:
        return <DiseaseDetectionGuide />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0000001a_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center justify-center p-2 mb-6 rounded-full 
              bg-emerald-500/10 ring-1 ring-emerald-500/20"
            >
              <BookOpenIcon className="w-6 h-6 text-emerald-500" />
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 
              ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Learning Center
            </h1>

            <p
              className={`text-xl max-w-2xl mx-auto mb-12 
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Master our AI-powered agricultural tools with comprehensive guides
              and detailed documentation.
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 
                  ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow"
                  }`}
              >
                <section.icon className="w-5 h-5 mr-2" />
                {section.title}
              </motion.button>
            ))}
          </div>

          {/* Content Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Learn;
