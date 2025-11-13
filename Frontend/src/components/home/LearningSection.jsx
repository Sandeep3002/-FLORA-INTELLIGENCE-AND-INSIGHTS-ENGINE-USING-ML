// src/components/home/LearningSection.jsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PhotoIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowLongRightIcon,
  BeakerIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

const LearningSection = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Disease Detection",
      description:
        "Identify plant diseases through image analysis. Upload clear photos of affected plant areas for instant detection.",
      tag: "Active",
      accuracy: "85%",
      status: "Stable",
      color: "from-emerald-500 to-teal-500",
      link: "/learn/disease-detection",
    },
    {
      icon: LightBulbIcon,
      title: "Crop Recommendation",
      description:
        "Get personalized crop suggestions based on environmental parameters and regional conditions.",
      tag: "Beta",
      accuracy: "82%",
      status: "Testing",
      color: "from-blue-500 to-indigo-500",
      link: "/learn/crop-recommendation",
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Yield Prediction",
      description:
        "Estimate potential crop yields using historical data and current growing conditions.",
      tag: "Active",
      accuracy: "78%",
      status: "Stable",
      color: "from-purple-500 to-pink-500",
      link: "/learn/yield-prediction",
    },
    {
      icon: PhotoIcon,
      title: "Species Identification",
      description:
        "Accurately identify plant species through image recognition. Perfect for crop verification.",
      tag: "Active",
      accuracy: "80%",
      status: "Stable",
      color: "from-amber-500 to-orange-500",
      link: "/learn/species-identification",
    },
    {
      icon: BeakerIcon,
      title: "Soil Analysis",
      description:
        "Analyze soil types through image processing. Currently supporting major soil classifications.",
      tag: "Beta",
      accuracy: "75%",
      status: "Testing",
      color: "from-rose-500 to-pink-500",
      link: "/learn/soil-analysis",
    },
  ];

  const guidelines = [
    {
      icon: CameraIcon,
      title: "Image Guidelines",
      items: [
        "Use well-lit, clear photos",
        "Avoid blurry or dark images",
        "Center the subject in frame",
        "Maintain proper distance",
      ],
    },
    {
      icon: ComputerDesktopIcon,
      title: "Platform Usage",
      items: [
        "Use modern browsers",
        "Enable JavaScript",
        "Maximum file size: 10MB",
        "Supported formats: JPG, PNG",
      ],
    },
    {
      icon: DocumentTextIcon,
      title: "Best Practices",
      items: [
        "Follow input guidelines",
        "Review results carefully",
        "Use feature-specific tips",
        "Check recommendations",
      ],
    },
  ];

  return (
    <section
      className={`py-24 relative overflow-hidden
      ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
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
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full
                    bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
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
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                darkMode
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20"
              }`}
            >
              Learning Hub
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
            Explore Our AI Features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-xl max-w-2xl mx-auto mb-12
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Learn how to use our AI-powered tools effectively for better farming
            decisions
          </motion.p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full" // Ensure parent container is full height
            >
              <Link
                to={feature.link}
                className={`block relative group rounded-2xl p-6 h-full
                  ${darkMode ? "bg-gray-800" : "bg-gray-50"}
                  hover:shadow-lg transition-all duration-300
                  transform hover:scale-[1.02]`}
              >
                <div className="flex flex-col h-full">
                  {" "}
                  {/* Use flex-col for vertical layout */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex-shrink-0
                      flex items-center justify-center
                      bg-gradient-to-r ${feature.color}
                      transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-xl font-semibold
                          ${darkMode ? "text-white" : "text-gray-900"}
                          group-hover:text-emerald-500 transition-colors duration-300`}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            feature.tag === "Beta"
                              ? darkMode
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-yellow-100 text-yellow-700"
                              : darkMode
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {feature.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`flex-grow mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/10">
                    <span
                      className={`text-sm font-medium flex items-center
                      ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-2
                        ${
                          feature.status === "Stable"
                            ? "bg-emerald-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      {feature.status}
                    </span>
                    <span
                      className={`text-sm font-medium
                      ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Accuracy: {feature.accuracy}
                    </span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 
                  group-hover:from-emerald-500/5 group-hover:to-teal-500/5 
                  transition-all duration-300 rounded-2xl"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guidelines Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {guidelines.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl
                ${darkMode ? "bg-gray-800" : "bg-gray-50"}
                hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg
                  flex items-center justify-center
                  bg-gradient-to-r from-emerald-500 to-teal-500`}
                >
                  <guide.icon className="w-5 h-5 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold
                  ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {guide.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {guide.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2">
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0
                      bg-gradient-to-r from-emerald-500 to-teal-500`}
                    />
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/learn"
            className="group inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium
              bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-600 hover:to-teal-600
              text-white transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl"
          >
            Explore Documentation
            <ArrowLongRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningSection;
