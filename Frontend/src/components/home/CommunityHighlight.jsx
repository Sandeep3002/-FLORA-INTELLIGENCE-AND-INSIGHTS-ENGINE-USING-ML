// src/components/home/CommunityHighlight.jsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

const CommunityHighlight = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: UserGroupIcon,
      title: "Connect with Farmers",
      description:
        "Join a thriving community of agricultural experts and fellow farmers",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Share Knowledge",
      description: "Exchange farming tips, experiences, and best practices",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: ShareIcon,
      title: "Collaborative Growth",
      description:
        "Learn from success stories and innovative farming techniques",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: HandRaisedIcon,
      title: "Expert Support",
      description:
        "Get guidance from agricultural professionals and researchers",
      color: "from-amber-500 to-orange-500",
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
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full
                    bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"
        />
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
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                darkMode
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20"
              }`}
            >
              Community
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
            Join Our Growing Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-xl max-w-2xl mx-auto mb-12
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Connect with fellow farmers and agricultural experts to share
            knowledge and grow together
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl p-6 overflow-hidden
                ${darkMode ? "bg-gray-800" : "bg-gray-50"}
                hover:shadow-lg transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 mb-4 rounded-lg
                flex items-center justify-center
                bg-gradient-to-r ${feature.color}
                transform group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2
                ${darkMode ? "text-white" : "text-gray-900"}
                group-hover:text-emerald-500 transition-colors duration-300`}
              >
                {feature.title}
              </h3>

              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {feature.description}
              </p>

              <div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 
                group-hover:from-emerald-500/5 group-hover:to-teal-500/5 
                transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/connect"
            className={`inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium
              bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-600 hover:to-teal-600
              text-white transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl`}
          >
            Join Community
            <svg
              className="w-5 h-5 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHighlight;
