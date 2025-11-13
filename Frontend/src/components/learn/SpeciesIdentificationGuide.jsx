// src/components/learn/SpeciesIdentificationGuide.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import SpeciesIdentification from "../analysis/SpeciesIdentification";
import {
  CameraIcon,
  SparklesIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  BookOpenIcon,
  ArrowRightIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

// Floating Particles Animation Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
          }}
        />
      ))}
    </div>
  );
};

// Interactive Feature Card with 3D effect
const FeatureCard = ({ title, description, icon: Icon, index }) => {
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
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
      />

      <div className="relative z-10">
        <motion.div
          animate={{
            rotateZ: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 
            flex items-center justify-center mb-4"
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

// Animated Step Card
const StepCard = ({ step, title, description, isActive, onClick }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          : darkMode
          ? "bg-gray-800/50 hover:bg-gray-800"
          : "bg-white/50 hover:bg-white"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ scale: isActive ? 1.1 : 1 }}
        className="flex items-center space-x-4"
      >
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
            {step}
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
      </motion.div>
    </motion.div>
  );
};
// Continuing from Part 1...

const SpeciesIdentificationGuide = () => {
  const { darkMode } = useTheme();
  const [showDemo, setShowDemo] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const features = [
    {
      title: "Visual Recognition",
      description:
        "Advanced image processing to identify plant species from photos",
      icon: CameraIcon,
    },
    {
      title: "Detailed Analysis",
      description:
        "Get comprehensive information about identified plant species",
      icon: MagnifyingGlassIcon,
    },
    {
      title: "Plant Database",
      description:
        "Access to growing database of plant species and characteristics",
      icon: BookOpenIcon,
    },
  ];

  const identificationTips = [
    {
      title: "Leaf Structure",
      items: [
        "Capture both sides of leaves",
        "Include leaf arrangement",
        "Show leaf margins clearly",
      ],
    },
    {
      title: "Flower Details",
      items: [
        "Photograph open blooms",
        "Include multiple angles",
        "Show flower clusters",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section with Floating Particles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <FloatingParticles />

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
                    AI-Powered Identification
                  </span>
                </motion.div>

                <h1
                  className={`text-3xl md:text-4xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Plant Species Identification
                </h1>

                <p
                  className={`text-lg ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Identify plant species instantly with our advanced visual
                  recognition system
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
                    <SpeciesIdentification previewMode={true} />
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
            title: "Take Photo",
            description: "Capture clear images of the plant",
          },
          {
            step: 2,
            title: "Upload",
            description: "Submit image for analysis",
          },
          {
            step: 3,
            title: "Get Results",
            description: "Receive detailed identification",
          },
        ].map((step) => (
          <StepCard
            key={step.step}
            {...step}
            isActive={activeStep === step.step}
            onClick={() => setActiveStep(step.step)}
          />
        ))}
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
              { label: "Recognition Accuracy", value: "80%" },
              { label: "Plant Species", value: "50+" },
              { label: "Response Time", value: "~2s" },
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

      {/* Photography Tips */}
      <div className="grid md:grid-cols-2 gap-4">
        {identificationTips.map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-xl ${
              darkMode ? "bg-gray-800/50" : "bg-white/50"
            } backdrop-blur-sm border border-emerald-500/10`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesIdentificationGuide;
