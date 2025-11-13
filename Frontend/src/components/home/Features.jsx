// src/components/home/Features.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  ChartBarIcon,
  CloudIcon,
  BeakerIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

const Features = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Disease Detection",
      description:
        "Early identification of plant diseases using advanced image recognition",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
      link: "/analysis/disease-detection",
    },
    {
      icon: ChartBarIcon,
      title: "Yield Prediction",
      description: "Data-driven forecasting for optimal harvest planning",
      color: "from-blue-500 to-indigo-500",
      delay: 0.3,
      link: "/analysis/yield-prediction",
    },
    {
      icon: BeakerIcon,
      title: "Soil Analysis",
      description: "Comprehensive soil health monitoring and recommendations",
      color: "from-amber-500 to-orange-500",
      delay: 0.4,
      link: "/analysis/soil-analysis",
    },
    {
      icon: SparklesIcon,
      title: "Crop Recommendation",
      description: "Personalized crop and fertilizer suggestions",
      color: "from-purple-500 to-pink-500",
      delay: 0.5,
      link: "/analysis/crop-recommendation",
    },
    {
      icon: IdentificationIcon,
      title: "Species Identification",
      description: "Instant identification of plant species and varieties",
      color: "from-teal-500 to-cyan-500",
      delay: 0.6,
      link: "/analysis/species-identification",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className={`py-24 relative overflow-hidden
      ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[120%] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full transform -skew-y-12">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute h-px w-48 
                  ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold
              ${
                darkMode
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              Advanced Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-3xl md:text-4xl font-bold mb-6
              ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Intelligent Agricultural Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-xl max-w-2xl mx-auto
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Leverage cutting-edge technology to revolutionize your farming
            practices and maximize yield potential
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={feature.link}
                className={`block relative group rounded-2xl p-6 overflow-hidden
                  ${darkMode ? "bg-gray-800" : "bg-white"}
                  hover:shadow-xl transition-all duration-300
                  border border-transparent
                  ${
                    darkMode ? "hover:border-gray-700" : "hover:border-gray-200"
                  }
                  transform hover:scale-105`}
              >
                {/* Feature Icon */}
                <div
                  className={`relative w-14 h-14 mb-6 rounded-lg
                  flex items-center justify-center
                  bg-gradient-to-r ${feature.color}
                  transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Feature Content */}
                <h3
                  className={`text-xl font-semibold mb-3
                  ${darkMode ? "text-white" : "text-gray-900"}
                  group-hover:text-emerald-500 transition-colors duration-300`}
                >
                  {feature.title}
                </h3>

                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 
                  group-hover:from-emerald-500/5 group-hover:to-teal-500/5 
                  transition-all duration-300"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
            ${
              darkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <SparklesIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">
              Powered by Advanced Machine Learning Algorithms
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
