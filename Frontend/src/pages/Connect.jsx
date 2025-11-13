// src/pages/Connect.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import TopicCard from "../components/connect/TopicCard";
import DiscussionThread from "../components/connect/DiscussionThread";
import { topics } from "../data/topicsData";
import {
  SparklesIcon,
  FireIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  ChevronDownIcon,
  BeakerIcon,
  ChartBarIcon,
  GlobeAsiaAustraliaIcon,
  LightBulbIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

// Quick stats data
const communityStats = [
  {
    icon: UserGroupIcon,
    label: "Active Experts",
    value: "2,450+",
    color: "text-emerald-500",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    label: "Daily Discussions",
    value: "3,800+",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: BeakerIcon,
    label: "Research Shared",
    value: "1,200+",
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: GlobeAsiaAustraliaIcon,
    label: "Countries Reached",
    value: "120+",
    color: "text-amber-500",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
];

// Featured categories with enhanced metadata
const featuredCategories = [
  {
    name: "Latest Discussions",
    icon: ChatBubbleLeftRightIcon,
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    description: "Recent conversations and trending topics",
  },
  {
    name: "Expert Insights",
    icon: LightBulbIcon,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    description: "Professional advice and analysis",
  },
  {
    name: "Research & Studies",
    icon: BeakerIcon,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    description: "Latest agricultural research findings",
  },
  {
    name: "Market Trends",
    icon: ChartBarIcon,
    color: "text-amber-500",
    gradient: "from-amber-500 to-orange-500",
    description: "Market analysis and predictions",
  },
];

// Topic filters
const topicFilters = [
  { id: "all", name: "All Topics", color: "from-gray-500 to-gray-600" },
  { id: "trending", name: "Trending", color: "from-red-500 to-orange-500" },
  {
    id: "crop-management",
    name: "Crop Management",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "organic-farming",
    name: "Organic",
    color: "from-green-500 to-emerald-500",
  },
  { id: "tech", name: "Technology", color: "from-blue-500 to-cyan-500" },
  { id: "market", name: "Market", color: "from-purple-500 to-pink-500" },
  {
    id: "sustainability",
    name: "Sustainability",
    color: "from-amber-500 to-orange-500",
  },
];

const Connect = () => {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [showTopics, setShowTopics] = useState(true);
  const [activeTab, setActiveTab] = useState("discussions");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter and sort topics
  useEffect(() => {
    let result = [...topics];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (topic) =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply topic filter
    if (selectedFilter !== "all") {
      if (selectedFilter === "trending") {
        result = result.filter((topic) => topic.trending);
      } else {
        result = result.filter((topic) =>
          topic.name.toLowerCase().includes(selectedFilter.replace("-", " "))
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "trending":
        result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case "engagement":
        result.sort((a, b) => b.engagement - a.engagement);
        break;
      case "discussions":
        result.sort((a, b) => b.discussions - a.discussions);
        break;
      default:
        break;
    }

    setFilteredTopics(result);
  }, [searchQuery, selectedFilter, sortBy]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center justify-center p-2 bg-emerald-500/10 rounded-full mb-4"
            >
              <SparklesIcon className="w-6 h-6 text-emerald-500" />
            </motion.div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 
              ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Flora AI Community
            </h1>

            <p
              className={`text-xl max-w-2xl mx-auto mb-12
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Connect with agricultural experts and fellow farmers
            </p>

            {/* Quick Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
              {communityStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-white/50"
                  }
                    backdrop-blur-sm border border-gray-200/10 shadow-lg`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl mb-4
                    bg-gradient-to-br ${stat.gradient}
                    flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-1
                    ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {stat.value}
                  </h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="relative mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(category.name.toLowerCase())}
                className={`p-6 rounded-xl border border-gray-200/10
                  ${darkMode ? "bg-gray-800/50" : "bg-white/50"}
                  backdrop-blur-sm shadow-lg
                  ${
                    activeTab === category.name.toLowerCase()
                      ? `ring-2 ring-${category.color}`
                      : ""
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-4
                  bg-gradient-to-br ${category.gradient}
                  flex items-center justify-center`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2
                  ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {category.name}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {category.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Discussion Thread Section */}
      <section className="relative mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DiscussionThread topics={topics} />
        </div>
      </section>

      {/* Topics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`text-2xl font-bold mb-2
                  ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Trending Topics
                </h2>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Explore popular discussions and join the conversation
                </p>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics..."
                    className={`pl-10 pr-4 py-2 rounded-lg w-64
                      ${
                        darkMode
                          ? "bg-gray-800 text-white placeholder-gray-400"
                          : "bg-white text-gray-900 placeholder-gray-500"
                      }
                      border border-gray-200/10
                      focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-4 pr-10 py-2 rounded-lg appearance-none
                    ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }
                    border border-gray-200/10
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none`}
                >
                  <option value="trending">Trending</option>
                  <option value="engagement">Most Engaged</option>
                  <option value="discussions">Most Discussed</option>
                </select>
              </div>
            </div>

            {/* Topic Filters */}
            <div className="flex flex-wrap gap-3">
              {topicFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300
                    ${
                      selectedFilter === filter.id
                        ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                        : darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <HashtagIcon className="w-4 h-4" />
                    {filter.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            {filteredTopics.map((topic) => (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                layoutId={`topic-${topic.id}`}
                className="h-full"
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FireIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3
                className={`text-xl font-medium mb-2 
                ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                No topics found
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Floating Action Button - Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-8 right-8 p-4 rounded-full
              bg-gradient-to-r from-emerald-500 to-teal-500
              text-white shadow-lg hover:shadow-xl
              transform hover:scale-105 transition-all duration-300`}
          >
            <ArrowTrendingUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Connect;
