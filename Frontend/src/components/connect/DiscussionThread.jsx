// src/components/connect/DiscussionThread.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreadMessage from "./ThreadMessage";
import { useTheme } from "../../context/ThemeContext";
import { generateAIResponse } from "../../services/apiService";
import { toast, Toaster } from "sonner";
import {
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CheckBadgeIcon,
  FireIcon,
  BookmarkIcon,
  ShareIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  LinkIcon,
  HashtagIcon,
  FlagIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const generateRandomFarmerName = () => {
  const firstNames = [
    "Dr.",
    "Prof.",
    "Shri",
    "Rajesh",
    "Suresh",
    "Mahesh",
    "Dinesh",
    "Ramesh",
    "Prakash",
    "Bharat",
    "Kishan",
    "Arjun",
  ];
  const lastNames = [
    "Patel",
    "Singh",
    "Kumar",
    "Sharma",
    "Verma",
    "Gupta",
    "Patil",
    "Reddy",
    "Choudhary",
    "Yadav",
    "Mishra",
    "Joshi",
  ];
  const villages = [
    "Pratappur",
    "Ganeshganj",
    "Ramgarh",
    "Krishnanagar",
    "Bhimpur",
    "Sultanpur",
    "Madhavpur",
    "Sitapur",
    "Gopalnagar",
    "Devgarh",
    "Anandpur",
    "Vijaynagar",
  ];

  return {
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    village: villages[Math.floor(Math.random() * villages.length)],
    experience: Math.floor(Math.random() * 30) + 5, // 5 to 35 years
  };
};

const DiscussionThread = ({ topics }) => {
  const { darkMode } = useTheme();
  const [userInput, setUserInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [threads, setThreads] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicSelector, setShowTopicSelector] = useState(false);

  // In DiscussionThread.jsx, update the handlePostSubmission function

  const handlePostSubmission = async () => {
    if (!userInput.trim()) {
      toast.error("Please enter your question or discussion topic");
      return;
    }

    setIsPosting(true);

    try {
      // Add user's post immediately with a unique ID
      const postId = Date.now();
      const userThread = {
        id: postId,
        question: {
          author: "You",
          content: userInput,
          topic: selectedTopic,
        },
        responses: [],
      };

      setThreads((prev) => [userThread, ...prev]);

      // Generate AI response
      const responses = await generateAIResponse(userInput);

      // Update the thread with responses
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === postId
            ? { ...thread, responses: responses || [] }
            : thread
        )
      );

      setUserInput("");
      setSelectedTopic(null);

      if (responses) {
        toast.success("Experts have responded to your question!");
      } else {
        toast.info("Using fallback responses due to API limitations");
      }
    } catch (error) {
      console.error("Error posting discussion:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto">
      <Toaster position="top-right" richColors closeButton />

      {/* Create Post Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          rounded-2xl p-4 sm:p-6 mb-8
          ${darkMode ? "bg-gray-800/90" : "bg-white/90"}
          backdrop-blur-lg shadow-xl
          border border-gray-200/10
        `}
      >
        {/* User Input Area */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-shrink-0 hidden sm:block">
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500
              flex items-center justify-center text-white font-medium"
            >
              <UserCircleIcon className="w-7 h-7" />
            </div>
          </div>
          <div className="flex-grow w-full">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Share your farming experience or ask a question..."
              className={`w-full p-4 rounded-xl mb-4 resize-none
                ${
                  darkMode
                    ? "bg-gray-700/50 text-white placeholder-gray-400"
                    : "bg-gray-50/50 text-gray-900 placeholder-gray-500"
                }
                focus:ring-2 focus:ring-emerald-500 focus:outline-none
                transition-all duration-300 backdrop-blur-sm`}
              rows={3}
            />

            {/* Mobile Topic Selection */}
            <div className="block sm:hidden mb-4">
              <select
                value={selectedTopic || ""}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className={`w-full p-3 rounded-lg
                  ${
                    darkMode
                      ? "bg-gray-700/50 text-white"
                      : "bg-gray-50/50 text-gray-900"
                  }
                  border border-gray-200/10
                  focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
              >
                <option value="">Select Topic</option>
                {topics?.map((topic) => (
                  <option key={topic.id} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Desktop Topic Selector */}
                <div className="hidden sm:block relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTopicSelector(!showTopicSelector)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg
                      ${darkMode ? "bg-gray-700/50" : "bg-gray-100/50"}
                      hover:bg-emerald-500/10 hover:text-emerald-500
                      transition-all duration-300
                    `}
                  >
                    <HashtagIcon className="w-5 h-5" />
                    <span className="truncate max-w-[150px]">
                      {selectedTopic || "Select Topic"}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {showTopicSelector && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`
                          absolute z-10 mt-2 w-64 p-2 rounded-xl
                          ${darkMode ? "bg-gray-700" : "bg-white"}
                          shadow-xl border border-gray-200/10
                          backdrop-blur-sm
                        `}
                      >
                        {topics?.map((topic) => (
                          <motion.button
                            key={topic.id}
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              setSelectedTopic(topic.name);
                              setShowTopicSelector(false);
                            }}
                            className={`
                              w-full text-left px-4 py-2 rounded-lg
                              ${
                                darkMode
                                  ? "hover:bg-gray-600"
                                  : "hover:bg-gray-100"
                              }
                              transition-all duration-300
                            `}
                          >
                            {topic.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-lg
                    ${darkMode ? "bg-gray-700/50" : "bg-gray-100/50"}
                    hover:bg-emerald-500/10 hover:text-emerald-500
                    transition-all duration-300
                  `}
                >
                  <PhotoIcon className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-2 rounded-lg
                    ${darkMode ? "bg-gray-700/50" : "bg-gray-100/50"}
                    hover:bg-emerald-500/10 hover:text-emerald-500
                    transition-all duration-300
                  `}
                >
                  <LinkIcon className="w-5 h-5" />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePostSubmission}
                disabled={isPosting || !userInput.trim()}
                className={`
                  flex items-center justify-center gap-2 px-6 py-2 rounded-lg
                  bg-gradient-to-r from-emerald-500 to-teal-500
                  hover:from-emerald-600 hover:to-teal-600
                  text-white font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300
                  w-full sm:w-auto
                `}
              >
                {isPosting ? (
                  <>
                    <SparklesIcon className="w-5 h-5 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    <span>Post Discussion</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Threads */}
      <div className="space-y-6">
        <AnimatePresence>
          {threads.map((thread, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ThreadMessage
                message={thread.question}
                responses={thread.responses}
                isQuestion={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {threads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3
              className={`text-xl font-medium mb-2 
              ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              No discussions yet
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Start a conversation by sharing your experience or asking a
              question
            </p>
          </motion.div>
        )}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isPosting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-xl`}
            >
              <SparklesIcon className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
              <p className={darkMode ? "text-white" : "text-gray-900"}>
                Getting responses from farmers...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscussionThread;
