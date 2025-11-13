// src/components/connect/TopicCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  FireIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ClockIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const TopicCard = ({ topic }) => {
  const { darkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const cardVariants = {
    collapsed: {
      height: "auto",
    },
    expanded: {
      height: "auto",
    },
  };

  const contentVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
    },
    expanded: {
      opacity: 1,
      height: "auto",
    },
  };

  return (
    <motion.div
      layout="position"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={cardVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        relative overflow-hidden rounded-xl
        ${darkMode ? "bg-gray-800/90" : "bg-white/90"}
        backdrop-blur-lg shadow-lg hover:shadow-xl
        transition-all duration-300
        border border-gray-200/10
        h-full
      `}
    >
      {/* Gradient Background Effect */}
      <div
        className="absolute inset-0 opacity-10 bg-gradient-to-br pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, ${topic.gradientColors.join(
            ", "
          )})`,
        }}
      />

      {/* Main Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              bg-gradient-to-r ${topic.color} text-white
              shadow-lg
            `}
          >
            {topic.name}
          </motion.div>

          {topic.trending && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full
                bg-red-500/10 text-red-500 text-sm font-medium"
            >
              <FireIcon className="w-4 h-4" />
              <span>Trending</span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <p
          className={`text-base mb-4 
          ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {topic.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div
            className="flex flex-col items-center p-3 rounded-lg
            bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
          >
            <UserGroupIcon className="w-6 h-6 text-emerald-500 mb-1" />
            <span
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {topic.experts}
            </span>
            <span className="text-xs text-gray-500">Experts</span>
          </div>

          <div
            className="flex flex-col items-center p-3 rounded-lg
            bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500 mb-1" />
            <span
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {topic.discussions}
            </span>
            <span className="text-xs text-gray-500">Discussions</span>
          </div>

          <div
            className="flex flex-col items-center p-3 rounded-lg
            bg-gradient-to-br from-purple-500/10 to-pink-500/10"
          >
            <ChartBarIcon className="w-6 h-6 text-purple-500 mb-1" />
            <span
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {topic.engagement}%
            </span>
            <span className="text-xs text-gray-500">Engagement</span>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Recent Activity */}
              <div className="border-t border-gray-200/10 pt-4">
                <h4
                  className={`text-sm font-medium mb-2
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {topic.recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-2 text-sm
                        ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span>{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Key Resources */}
              <div className="border-t border-gray-200/10 pt-4">
                <h4
                  className={`text-sm font-medium mb-2
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Key Resources
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {topic.resources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-2 p-2 rounded-lg
                        ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}
                        hover:ring-2 hover:ring-emerald-500/50 transition-all duration-300`}
                    >
                      {resource.type === "guide" ? (
                        <DocumentTextIcon className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <BeakerIcon className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm truncate">{resource.title}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/10">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full transition-colors
                ${
                  isBookmarked
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "hover:bg-gray-500/10"
                }`}
            >
              <BookmarkIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-500/10 transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }
              transition-colors duration-300
            `}
          >
            <span className="text-sm">
              {isExpanded ? "Show Less" : "Show More"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowTrendingUpIcon className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCard;
