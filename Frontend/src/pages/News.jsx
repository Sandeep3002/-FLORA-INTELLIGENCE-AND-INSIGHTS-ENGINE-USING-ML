// src/pages/News.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  SparklesIcon,
  ArrowLongRightIcon,
  CalendarIcon,
  NewspaperIcon,
  ShareIcon,
  BookmarkIcon,
  ChevronUpIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

// Utility function for date formatting
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Shimmer loading effect component
const ShimmerEffect = () => (
  <div className="animate-pulse rounded-2xl overflow-hidden">
    <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
    </div>
  </div>
);

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-emerald-500 text-white shadow-lg
            hover:bg-emerald-600 transition-all duration-300 z-50 group"
        >
          <ChevronUpIcon className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Category button component
const CategoryButton = ({ active, children, onClick, darkMode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 rounded-full transition-all duration-300 font-medium
      ${
        active
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
          : darkMode
          ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
          : "bg-white/50 text-gray-700 hover:bg-white/80 backdrop-blur-sm shadow-sm"
      }`}
  >
    {children}
  </motion.button>
);

// Share modal component
const ShareModal = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      article.url
    )}&text=${encodeURIComponent(article.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      article.url
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      article.url
    )}&title=${encodeURIComponent(article.title)}`,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Share Article
          </h3>
          <div className="space-y-4">
            {Object.entries(shareUrls).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 rounded-lg
                  bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                  hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              >
                Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
// Continuing from the previous code...

const NewsCard = ({ article, index, darkMode, onShare }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`group rounded-2xl overflow-hidden ${
        darkMode
          ? "bg-gray-800/80 hover:bg-gray-800"
          : "bg-white/80 hover:bg-white"
      } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500`}
    >
      <div className="relative">
        {!imageError && article.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 
              transition-all duration-300 shadow-lg"
          >
            {isBookmarked ? (
              <BookmarkSolidIcon className="w-5 h-5 text-emerald-400" />
            ) : (
              <BookmarkIcon className="w-5 h-5 text-white" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare(article)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 
              transition-all duration-300 shadow-lg"
          >
            <ShareIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`flex items-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <CalendarIcon className="w-4 h-4 mr-1" />
            {formatDate(article.publishedAt)}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium 
            bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            {article.source.name}
          </span>
        </div>

        <h3
          className={`text-xl font-semibold mb-3 line-clamp-2 
          group-hover:text-emerald-500 transition-colors duration-300 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`mb-6 line-clamp-3 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg
            bg-gradient-to-r from-emerald-500 to-teal-500 text-white
            hover:from-emerald-600 hover:to-teal-600 transition-all duration-300
            group/button"
        >
          Read Full Article
          <ArrowLongRightIcon className="w-5 h-5 ml-2 group-hover/button:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
};

const News = () => {
  const { darkMode } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("agriculture");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    article: null,
  });

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const categories = [
    { value: "agriculture", label: "Agriculture" },
    { value: "farming", label: "Farming" },
    { value: "organic farming", label: "Organic" },
    { value: "sustainable agriculture", label: "Sustainable" },
    { value: "agtech", label: "AgTech" },
    { value: "precision farming", label: "Precision" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${category}&lang=en&country=us&max=9&page=${page}&apikey=c08d449b54ac53290dfea215e6e1a112`
        );

        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        if (data.articles) {
          setNews((prev) =>
            page === 1 ? data.articles : [...prev, ...data.articles]
          );
          setHasMore(data.articles.length > 0);
        } else {
          throw new Error("Invalid data received");
        }
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setNews([]);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0000001a_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      </div>

      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center justify-center p-2 mb-6 rounded-full 
              bg-emerald-500/10 ring-1 ring-emerald-500/20"
            >
              <NewspaperIcon className="w-6 h-6 text-emerald-500" />
            </div>

            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Agricultural News & Insights
            </h1>

            <p
              className={`text-xl mb-12 max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Stay updated with the latest developments in agriculture, farming
              technologies, and sustainable practices.
            </p>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.value}
                  active={category === cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  darkMode={darkMode}
                >
                  {cat.label}
                </CategoryButton>
              ))}
            </div>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 mb-8 p-4 rounded-lg bg-red-500/10"
            >
              {error}
            </motion.div>
          )}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div
                key={article.url + index}
                ref={index === news.length - 1 ? lastNewsElementRef : null}
              >
                <NewsCard
                  article={article}
                  index={index}
                  darkMode={darkMode}
                  onShare={(article) =>
                    setShareModal({ isOpen: true, article })
                  }
                />
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[...Array(3)].map((_, index) => (
                <ShimmerEffect key={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false, article: null })}
        article={shareModal.article}
      />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default News;
