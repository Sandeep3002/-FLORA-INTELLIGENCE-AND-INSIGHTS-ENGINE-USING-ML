// src/pages/Analysis.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  IdentificationIcon,
  BeakerIcon,
  LightBulbIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const analysisTools = [
  {
    id: "disease-detection",
    title: "Disease Detection",
    description: "Upload plant images for accurate disease identification",
    icon: MagnifyingGlassIcon,
    path: "/analysis/disease-detection",
    image:
      "https://images.pexels.com/photos/10479415/pexels-photo-10479415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Disease identification",
      "Treatment suggestions",
      "Early detection",
      "Common crop diseases",
    ],
    stats: {
      detection: "30+",
      crops: "15+",
      accuracy: "85%",
    },
  },
  {
    id: "yield-prediction",
    title: "Yield Prediction",
    description: "Predict crop yields based on historical data",
    icon: ChartBarIcon,
    path: "/analysis/yield-prediction",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=60",
    features: [
      "Yield estimation",
      "Weather analysis",
      "Seasonal patterns",
      "Growth tracking",
    ],
    stats: {
      factors: "5+",
      accuracy: "80%",
      period: "3mo",
    },
  },
  {
    id: "species-identification",
    title: "Species Identification",
    description: "Identify plant species using image recognition",
    icon: IdentificationIcon,
    path: "/analysis/species-identification",
    image:
      "https://images.pexels.com/photos/11988699/pexels-photo-11988699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Species detection",
      "Plant information",
      "Growth details",
      "Care guidelines",
    ],
    stats: {
      species: "100+",
      accuracy: "82%",
      regions: "10+",
    },
  },
  {
    id: "soil-analysis",
    title: "Soil Analysis",
    description: "Analyze soil conditions for better crop management",
    icon: BeakerIcon,
    path: "/analysis/soil-analysis",
    image:
      "https://images.pexels.com/photos/2203683/pexels-photo-2203683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Nutrient levels",
      "pH analysis",
      "Soil type",
      "Recommendations",
    ],
    stats: {
      tests: "8+",
      depth: "30cm",
      types: "12+",
    },
  },
  {
    id: "crop-recommendation",
    title: "Crop Recommendation",
    description: "Get suitable crop suggestions for your conditions",
    icon: LightBulbIcon,
    path: "/analysis/crop-recommendation",
    image:
      "https://images.pexels.com/photos/1125121/pexels-photo-1125121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    features: [
      "Crop suggestions",
      "Season planning",
      "Soil matching",
      "Climate check",
    ],
    stats: {
      crops: "25+",
      factors: "6+",
      regions: "8+",
    },
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const steps = [
  {
    title: "Choose Tool",
    description: "Select the analysis tool you need",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Input Data",
    description: "Provide the required information",
    icon: BeakerIcon,
  },
  {
    title: "View Results",
    description: "Get analysis results and recommendations",
    icon: LightBulbIcon,
  },
];
function Analysis() {
  const { darkMode } = useTheme();

  const AnalysisCard = ({ tool }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`
          relative rounded-xl overflow-hidden
          ${darkMode ? "bg-gray-800" : "bg-white"}
          shadow-lg hover:shadow-xl
          transition-all duration-300
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={tool.image}
            alt={tool.title}
            className={`
              w-full h-full object-cover
              transition-transform duration-500
              ${isHovered ? "scale-110" : "scale-100"}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3">
              <div
                className={`
                p-2 rounded-lg
                ${darkMode ? "bg-white/10" : "bg-black/10"}
                backdrop-blur-sm
              `}
              >
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">{tool.title}</h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p
            className={`
            text-base mb-6
            ${darkMode ? "text-gray-300" : "text-gray-600"}
          `}
          >
            {tool.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Object.entries(tool.stats).map(([key, value]) => (
              <div
                key={key}
                className={`
                  text-center p-2 rounded-lg
                  ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}
                  transition-all duration-300
                `}
              >
                <div
                  className={`
                  font-semibold
                  ${darkMode ? "text-green-400" : "text-green-600"}
                `}
                >
                  {value}
                </div>
                <div
                  className={`
                  text-sm capitalize
                  ${darkMode ? "text-gray-400" : "text-gray-500"}
                `}
                >
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {tool.features.map((feature, idx) => (
              <div
                key={idx}
                className={`
                  flex items-center gap-2 p-2 rounded-lg
                  ${darkMode ? "text-gray-300" : "text-gray-600"}
                `}
              >
                <CheckCircleIcon
                  className={`
                  w-5 h-5
                  ${darkMode ? "text-green-400" : "text-green-600"}
                `}
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Link
            to={tool.path}
            className={`
              group flex items-center justify-center
              w-full px-4 py-2 rounded-lg
              ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }
              transition-all duration-300
              font-medium
            `}
          >
            Start Analysis
            <ArrowRightIcon
              className={`
              w-5 h-5 ml-2
              transition-transform duration-300
              ${isHovered ? "translate-x-1" : ""}
            `}
            />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className={`
      min-h-screen pt-20
      ${darkMode ? "bg-gray-900" : "bg-gray-50"}
    `}
    >
      {/* Hero Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span
              className={`
              inline-block px-4 py-1 rounded-full text-sm font-medium mb-4
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-600"
              }
            `}
            >
              Agricultural Analysis Tools
            </span>
            <h1
              className={`
              text-3xl md:text-4xl font-bold mb-4
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
            >
              Enhance Your Farming Decisions
            </h1>
            <p
              className={`
              text-lg max-w-2xl mx-auto
              ${darkMode ? "text-gray-300" : "text-gray-600"}
            `}
            >
              Select a tool to analyze and optimize your agricultural practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {analysisTools.map((tool) => (
              <AnalysisCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section
        className={`
        py-20
        ${darkMode ? "bg-gray-800" : "bg-white"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`
              text-2xl md:text-3xl font-bold mb-4
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
            >
              How It Works
            </h2>
            <p
              className={`
              ${darkMode ? "text-gray-300" : "text-gray-600"}
            `}
            >
              Get started with our analysis tools in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`
                  p-6 rounded-xl text-center
                  ${darkMode ? "bg-gray-700" : "bg-gray-50"}
                `}
              >
                <div
                  className={`
                  w-12 h-12 rounded-full
                  flex items-center justify-center
                  mx-auto mb-4
                  ${darkMode ? "bg-gray-600" : "bg-white"}
                `}
                >
                  <step.icon
                    className={`
                    w-6 h-6
                    ${darkMode ? "text-green-400" : "text-green-600"}
                  `}
                  />
                </div>
                <h3
                  className={`
                  text-lg font-semibold mb-2
                  ${darkMode ? "text-white" : "text-gray-900"}
                `}
                >
                  {step.title}
                </h3>
                <p
                  className={`
                  ${darkMode ? "text-gray-300" : "text-gray-600"}
                `}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analysis;
