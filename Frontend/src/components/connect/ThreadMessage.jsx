// src/components/connect/ThreadMessage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  UserCircleIcon,
  HandThumbUpIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

const ThreadMessage = ({ message, responses, isQuestion = false }) => {
  const { darkMode } = useTheme();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10));

  return (
    <div className="mb-8">
      {/* Main Question/Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl ${
          isQuestion
            ? `${darkMode ? "bg-emerald-900/40" : "bg-emerald-50"} 
               ring-1 ring-emerald-800/50`
            : `${darkMode ? "bg-gray-800/40" : "bg-gray-50"} 
               ring-1 ring-gray-200/50`
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full 
              ${
                isQuestion
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600"
              }
              flex items-center justify-center`}
            >
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h3
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {message.author}
              </h3>
              {!isQuestion && (
                <span className="ml-2 text-sm text-emerald-500">
                  • {message.village} • {message.experience} years farming
                  experience
                </span>
              )}
            </div>
            <p
              className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {message.content}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
                }}
                className={`flex items-center gap-1 text-sm
                  ${
                    liked
                      ? "text-emerald-500"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                  hover:text-emerald-500 transition-colors`}
              >
                <HandThumbUpIcon className="w-4 h-4" />
                <span>{likeCount}</span>
              </button>
              <button
                onClick={() => toast.info("This feature is coming soon!")}
                className={`flex items-center gap-1 text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-600"}
                  hover:text-red-500 transition-colors`}
              >
                <FlagIcon className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Thread Line and Responses */}
      {responses && responses.length > 0 && (
        <div className="relative ml-5 mt-2 pl-8 border-l-2 border-emerald-800/50">
          {responses.map((response, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4 relative"
            >
              <div className="absolute -left-8 top-4 w-6 h-px bg-emerald-800/50" />
              <div
                className={`p-4 rounded-xl
                ${darkMode ? "bg-gray-800/40" : "bg-gray-50"}
                ring-1 ring-gray-200/50`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500
                      flex items-center justify-center"
                    >
                      <UserCircleIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h3
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {response.author}
                      </h3>
                      <span className="ml-2 text-sm text-emerald-500">
                        • {response.village} • {response.experience} years
                        farming experience
                      </span>
                    </div>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {response.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadMessage;
