// src/components/home/Hero.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useRef, useEffect, useState } from "react";
import { GradientText } from "../ui/GradientText";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Update window height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax and scroll effects
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated Plant Component
  const PlantComponent = ({ className, delay }) => (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          fill="none"
          className={darkMode ? "text-emerald-500/40" : "text-emerald-600/40"}
        >
          <motion.path
            d="M60 200 C60 150 60 100 60 50"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <motion.path
            d="M60 150 C40 130 30 110 40 90"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            d="M60 120 C40 100 30 80 40 60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            d="M60 150 C80 130 90 110 80 90"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <motion.path
            d="M60 120 C80 100 90 80 80 60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>
    </motion.div>
  );

  // Floating particles animation
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
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
            opacity: darkMode ? 0.1 : 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: darkMode ? [0.1, 0.3, 0.1] : [0.2, 0.4, 0.2],
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

  return (
    <section
      ref={containerRef}
      style={{ minHeight: `${windowHeight}px` }}
      className={`relative w-full flex flex-col justify-center
        ${
          darkMode
            ? "bg-gradient-to-b from-[#0f172a] via-[#162037] to-[#1e293b]"
            : "bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200"
        }`}
    >
      <Particles />

      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
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
          className={`absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full
            ${
              darkMode
                ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20"
                : "bg-gradient-to-r from-emerald-600/30 to-teal-600/30"
            } blur-3xl`}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full
            ${
              darkMode
                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                : "bg-gradient-to-r from-blue-600/30 to-cyan-600/30"
            } blur-3xl`}
        />
      </div>
      {/* Decorative Plants */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 w-full overflow-hidden"
      >
        <motion.div style={{ y: y1 }} className="absolute -bottom-20 left-[5%]">
          <PlantComponent delay={0.2} className="scale-75" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 right-[10%]"
        >
          <PlantComponent delay={0.4} className="scale-100" />
        </motion.div>
        <motion.div
          style={{ y: y3 }}
          className="absolute -bottom-20 left-[80%]"
        >
          <PlantComponent delay={0.6} className="scale-90" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Smart Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-8 relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(5, 150, 105, 0)",
                  "0 0 0 10px rgba(5, 150, 105, 0.2)",
                  "0 0 0 20px rgba(5, 150, 105, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium
                flex items-center gap-2 backdrop-blur-sm
                ${
                  darkMode
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20"
                }`}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Smart Farming Solutions
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
              font-bold leading-tight tracking-tight mb-6
              ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Transform Your Farm with <GradientText><br/>AI-Powered</GradientText>{" "}
            <br className="hidden sm:block" />
            Agricultural Analytics
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-xl max-w-2xl mx-auto mb-12
              ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Leverage cutting-edge AI technology to optimize your crop yield,
            detect diseases early, and make data-driven farming decisions for
            sustainable agriculture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Start Analysis Button */}
            <Link
              to="/analysis"
              className={`group relative inline-flex items-center px-8 py-4 
                rounded-lg text-lg font-medium overflow-hidden
                transform transition-all duration-300 hover:scale-105
                ${
                  darkMode
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                } text-white shadow-lg hover:shadow-xl`}
            >
              <span className="relative flex items-center">
                Start Analysis
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowLongRightIcon className="w-6 h-6" />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: [0, 1, 1], opacity: [0, 0.25, 0] }}
                transition={{ duration: 0.5 }}
              />
            </Link>

            {/* Learn More Button */}
            <Link
              to="/learn"
              className={`group relative inline-flex items-center px-8 py-4 
                rounded-lg text-lg font-medium overflow-hidden
                transform transition-all duration-300 hover:scale-105
                border-2 ${
                  darkMode
                    ? "border-white text-white hover:bg-white hover:text-gray-900"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
            >
              <span className="relative flex items-center">
                Learn More
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowLongRightIcon className="w-6 h-6" />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-6 h-10 rounded-full border-2 
              ${darkMode ? "border-white" : "border-gray-900"}
              flex justify-center p-2`}
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`w-1 h-2 rounded-full 
                ${darkMode ? "bg-white" : "bg-gray-900"}`}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
