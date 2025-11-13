// src/components/home/NewsPreview.jsx
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLongRightIcon,
  LightBulbIcon,
  BeakerIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const NewsPreview = () => {
  const { darkMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();

  const highlights = [
    {
      icon: LightBulbIcon,
      title: "AI in Modern Agriculture",
      description:
        "Discover how artificial intelligence is revolutionizing farming practices through advanced analysis and predictions.",
      category: "Technology",
      color: "from-emerald-500 to-teal-500",
      bgPattern:
        "radial-gradient(circle at 10% 20%, rgb(4, 159, 108) 0%, rgb(194, 254, 113) 90.1%)",
      stats: {
        label: "AI Adoption",
        value: "Growing",
      },
    },
    {
      icon: BeakerIcon,
      title: "Smart Farming Insights",
      description:
        "Explore the latest developments in precision agriculture and data-driven farming decisions.",
      category: "Innovation",
      color: "from-blue-500 to-indigo-500",
      bgPattern:
        "radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)",
      stats: {
        label: "Efficiency Boost",
        value: "Significant",
      },
    },
    {
      icon: ChartBarIcon,
      title: "Digital Agriculture Trends",
      description:
        "Stay updated with emerging technologies and tools shaping the future of agriculture.",
      category: "Trends",
      color: "from-purple-500 to-pink-500",
      bgPattern:
        "radial-gradient(circle at 10% 20%, rgb(105, 2, 98) 0%, rgb(109, 115, 216) 90%)",
      stats: {
        label: "Impact Level",
        value: "High",
      },
    },
  ];

  // Floating particles animation
  const Particles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            darkMode ? "bg-emerald-500" : "bg-emerald-600"
          }`}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className={`py-24 relative overflow-hidden
      ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <Particles />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full
                    bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2
                ${
                  darkMode
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20"
                }`}
            >
              <SparklesIcon className="w-4 h-4" />
              Featured Insights
            </motion.span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-3xl md:text-4xl font-bold mb-6
              ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Agricultural Technology Trends
          </motion.h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative rounded-2xl p-6 overflow-hidden
                ${darkMode ? "bg-gray-800" : "bg-gray-50"}
                hover:shadow-lg transition-all duration-300`}
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ backgroundImage: item.bgPattern }}
              />

              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className={`w-12 h-12 rounded-lg mb-6
                  flex items-center justify-center
                  bg-gradient-to-r ${item.color}`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Category */}
              <motion.div
                className="flex items-center mb-4"
                animate={{ x: hoveredIndex === index ? 10 : 0 }}
              >
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    darkMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {item.category}
                </span>
              </motion.div>

              {/* Content */}
              <h3
                className={`text-xl font-semibold mb-3
                ${darkMode ? "text-white" : "text-gray-900"}
                group-hover:text-emerald-500 transition-colors duration-300`}
              >
                {item.title}
              </h3>

              <p
                className={`mb-4
                ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {item.description}
              </p>

              {/* Stats */}
              <motion.div
                animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/10"
              >
                <span
                  className={`text-sm font-medium
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.stats.label}
                </span>
                <span
                  className={`text-sm font-bold
                  bg-gradient-to-r ${item.color} text-transparent bg-clip-text`}
                >
                  {item.stats.value}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/news"
            className="group relative inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium
              overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center text-white">
              Explore Latest News
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLongRightIcon className="w-6 h-6" />
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsPreview;
