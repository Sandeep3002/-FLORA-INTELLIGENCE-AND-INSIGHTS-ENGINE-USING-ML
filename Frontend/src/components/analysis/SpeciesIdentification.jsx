// src/components/analysis/SpeciesIdentification.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  ArrowPathIcon,
  BeakerIcon,
  SunIcon,
  WrenchScrewdriverIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  IdentificationIcon,
  CloudIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import { getNextApiKey } from "../../utils/apiKeys";

const LoadingAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center p-8"
  >
    <div className="relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-20 h-20"
      >
        <div className="absolute inset-0 border-4 border-green-500/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin" />
        <SparklesIcon className="absolute inset-0 m-auto w-8 h-8 text-green-400 animate-pulse" />
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 text-lg font-medium text-green-500"
    >
      Analyzing your plant...
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-2 flex space-x-1"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
      ))}
    </motion.div>
  </motion.div>
);

const ResultSection = ({ title, content, icon: Icon, darkMode, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className={`
      mb-6 p-6 rounded-xl transition-all duration-300
      ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}
      hover:shadow-xl backdrop-blur-sm
      border ${darkMode ? "border-gray-700" : "border-gray-200"}
    `}
  >
    <motion.div className="flex items-center gap-3 mb-4" whileHover={{ x: 5 }}>
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className={`
          p-3 rounded-full
          ${darkMode ? "bg-green-900/30" : "bg-green-100"}
          shadow-lg
        `}
      >
        <Icon
          className={`w-6 h-6 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        />
      </motion.div>
      <h3
        className={`
        text-lg font-semibold
        ${darkMode ? "text-gray-200" : "text-gray-700"}
        tracking-wide
      `}
      >
        {title}
      </h3>
    </motion.div>
    <motion.div
      className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      {content.split("\n").map((line, idx) => {
        if (line.trim().startsWith("-")) {
          const [label, ...value] = line.substring(1).split(":");
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col"
            >
              <span className="font-medium text-green-500">{label.trim()}</span>
              <span className="ml-4 mt-1">{value.join(":").trim()}</span>
            </motion.div>
          );
        }
        return (
          <motion.p
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            {line}
          </motion.p>
        );
      })}
    </motion.div>
  </motion.div>
);

// Updated UploadZone Component with proper click handling
const UploadZone = ({
  onFileSelect,
  selectedImage,
  previewUrl,
  darkMode,
  fileInputRef,
  onReset,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => fileInputRef.current?.click()}
    className={`
      p-8 rounded-xl cursor-pointer
      ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}
      border-2 border-dashed
      ${darkMode ? "border-gray-600" : "border-gray-300"}
      transition-all duration-300
      hover:border-green-500
      relative
      overflow-hidden
    `}
  >
    <input
      ref={fileInputRef}
      type="file"
      onChange={onFileSelect}
      accept="image/*"
      className="hidden"
    />

    {!selectedImage ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-4 rounded-full bg-green-500/10"
          >
            <ArrowUpTrayIcon className="w-12 h-12 text-green-500" />
          </motion.div>
        </div>
        <p className="mt-4 text-lg font-medium text-green-500">
          Drop your plant image here
        </p>
        <p className="mt-2 text-sm text-gray-500">or click to browse</p>
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <img
          src={previewUrl}
          alt="Selected plant"
          className="w-full h-64 object-contain rounded-lg"
        />
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            absolute top-2 right-2 p-2 rounded-full
            ${darkMode ? "bg-gray-700" : "bg-white"}
            shadow-lg
          `}
        >
          <XMarkIcon className="w-5 h-5 text-red-500" />
        </motion.button>
      </motion.div>
    )}
  </motion.div>
);
function SpeciesIdentification() {
  const { darkMode } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzePlant = async (imageFile, retryCount = 0) => {
    if (!imageFile) return;
    if (retryCount >= 4) {
      setError("All API keys have been exhausted. Please try again later.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Image = reader.result.split(",")[1];
          const apiKey = getNextApiKey();

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: {
                  role: "user",
                  parts: [
                    {
                      text: `Analyze this plant image and provide detailed information in these exact sections:

1. Species Identification
- Common Name:
- Scientific Name:(use plain text, no italics or special formatting)
- Family:
- Origin:

2. Plant Characteristics
- Growth Habit:
- Height:
- Leaf Type:
- Flower Details:
- Special Features:

3. Growing Conditions
- Light Requirements:
- Water Needs:
- Soil Type:
- Temperature Range:
- Humidity:

4. Care Instructions
- Watering Schedule:
- Fertilization:
- Pruning:
- Common Issues:
- Special Care Notes:

Provide clear, specific information without using markdown formatting or asterisks.`,
                    },
                    {
                      inlineData: {
                        mimeType: imageFile.type,
                        data: base64Image,
                      },
                    },
                  ],
                },
                generationConfig: {
                  temperature: 0.4,
                  topK: 32,
                  topP: 1,
                  maxOutputTokens: 1024,
                },
              }),
            }
          );

          if (!response.ok) {
            if (response.status === 429) {
              return analyzePlant(imageFile, retryCount + 1);
            }
            throw new Error(`API Error: ${response.status}`);
          }

          const data = await response.json();
          const text = data.candidates[0]?.content?.parts[0]?.text;

          if (text) {
            const sections = text.split(/\d+\.\s+/).filter(Boolean);
            setResult(
              sections.map((content, index) => ({
                title: [
                  "Species Identification",
                  "Plant Characteristics",
                  "Growing Conditions",
                  "Care Instructions",
                ][index],
                content: content.trim().replace(/\*\*/g, ""),
                icon: [
                  IdentificationIcon,
                  SparklesIcon,
                  SunIcon,
                  WrenchScrewdriverIcon,
                ][index],
              }))
            );
          } else {
            throw new Error("Invalid response format");
          }
        } catch (err) {
          if (retryCount < 3) {
            return analyzePlant(imageFile, retryCount + 1);
          }
          throw err;
        }
      };

      reader.readAsDataURL(imageFile);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        analyzePlant(file);
      } else {
        setError("Please select a valid image file");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      analyzePlant(file);
    } else {
      setError("Please drop a valid image file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`
              inline-flex items-center justify-center p-3 rounded-full mb-6
              ${darkMode ? "bg-green-900/20" : "bg-green-100"}
            `}
          >
            <SparklesIcon className="w-8 h-8 text-green-500" />
          </motion.div>
          <h1
            className={`
            text-4xl font-bold mb-4
            ${darkMode ? "text-white" : "text-gray-900"}
            tracking-tight
          `}
          >
            Plant Species Identification
          </h1>
          <p
            className={`
            text-xl max-w-2xl mx-auto
            ${darkMode ? "text-gray-300" : "text-gray-600"}
          `}
          >
            Upload a plant image to discover its species and get detailed care
            information
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3"
          >
            <div
              className={`
              p-6 rounded-xl
              ${darkMode ? "bg-gray-800/50" : "bg-white"}
              backdrop-blur-sm
              shadow-xl
              border ${darkMode ? "border-gray-700" : "border-gray-200"}
            `}
            >
              <UploadZone
                onFileSelect={handleFileSelect}
                selectedImage={selectedImage}
                previewUrl={previewUrl}
                darkMode={darkMode}
                fileInputRef={fileInputRef}
                onReset={handleReset}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center space-x-2 text-red-500">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3"
          >
            <div
              className={`
              p-6 rounded-xl
              ${darkMode ? "bg-gray-800/50" : "bg-white"}
              backdrop-blur-sm
              shadow-xl
              border ${darkMode ? "border-gray-700" : "border-gray-200"}
              min-h-[500px]
            `}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <LoadingAnimation />
                ) : result ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {result.map((section, index) => (
                      <ResultSection
                        key={index}
                        {...section}
                        darkMode={darkMode}
                        index={index}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-[400px]"
                  >
                    <CameraIcon
                      className={`
                      w-16 h-16 mb-4
                      ${darkMode ? "text-gray-600" : "text-gray-400"}
                    `}
                    />
                    <p
                      className={`
                      text-lg
                      ${darkMode ? "text-gray-400" : "text-gray-500"}
                    `}
                    >
                      Upload an image to see analysis results
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SpeciesIdentification;
