// src/components/common/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  navVariants,
  dropdownVariants,
  linkHoverVariants,
} from "../../utils/navbarAnimations";
import {
  BeakerIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  UserGroupIcon,
  NewspaperIcon,
  BookOpenIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  SparklesIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Enhanced scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const analysisModules = [
    {
      name: "Disease Detection",
      path: "/analysis/disease-detection",
      description: "AI-powered plant disease analysis",
      icon: <BeakerIcon className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Yield Prediction",
      path: "/analysis/yield-prediction",
      description: "Data-driven crop yield forecasting",
      icon: <ChartBarIcon className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Species Identification",
      path: "/analysis/species-identification",
      description: "Instant plant species recognition",
      icon: <SparklesIcon className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Soil Analysis",
      path: "/analysis/soil-analysis",
      description: "Comprehensive soil health assessment",
      icon: <BeakerIcon className="w-5 h-5" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Crop Recommendation",
      path: "/analysis/crop-recommendation",
      description: "Smart crop selection guidance",
      icon: <LightBulbIcon className="w-5 h-5" />,
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`
        fixed w-full top-0 z-50
        backdrop-blur-md
        transition-all duration-300 ease-in-out
        ${
          scrolled
            ? `shadow-lg ${darkMode ? "shadow-black/10" : "shadow-gray-200/80"}`
            : ""
        }
        ${darkMode ? "bg-gray-900/90" : "bg-white/90"}
        border-b border-gray-200/10
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Primary Nav Section */}
          <div className="flex items-center">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center gap-3 group">
                <div
                  className={`
                  p-2 rounded-xl
                  bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                  group-hover:from-emerald-500/20 group-hover:to-teal-500/20
                  transition-all duration-300
                `}
                >
                  <img
                    src="/src/assets/images/logo.png"
                    alt="Flora AI"
                    className="h-8 w-8"
                  />
                </div>
                <span
                  className={`
                  text-xl font-semibold hidden sm:block
                  bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text
                `}
                >
                  Flora AI
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ml-8 gap-2">
              <DesktopNavLink to="/" icon={<HomeIcon className="w-5 h-5" />}>
                Home
              </DesktopNavLink>

              {/* Analysis Hub Dropdown */}
              <DesktopDropdown
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                modules={analysisModules}
              />

              <DesktopNavLink
                to="/connect"
                icon={<UserGroupIcon className="w-5 h-5" />}
              >
                Connect
              </DesktopNavLink>

              <DesktopNavLink
                to="/news"
                icon={<NewspaperIcon className="w-5 h-5" />}
              >
                News
              </DesktopNavLink>

              <DesktopNavLink
                to="/learn"
                icon={<BookOpenIcon className="w-5 h-5" />}
              >
                Learn
              </DesktopNavLink>
            </div>
          </div>

          {/* Right Section: Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-lg
                bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                hover:from-emerald-500/20 hover:to-teal-500/20
                text-emerald-500
                transition-all duration-300
              `}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg
                bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                hover:from-emerald-500/20 hover:to-teal-500/20
                text-emerald-500
                transition-all duration-300
              `}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`
              lg:hidden fixed inset-x-0 top-16 bottom-0
              ${darkMode ? "bg-gray-900/95" : "bg-white/95"}
              backdrop-blur-md
              border-t border-gray-200/10
              overflow-y-auto
            `}
          >
            <MobileMenu modules={analysisModules} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
// Desktop Navigation Link Component
function DesktopNavLink({ to, icon, children }) {
  const { darkMode } = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div variants={linkHoverVariants} whileHover="hover" whileTap="tap">
      <Link
        to={to}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          font-medium relative overflow-hidden
          transition-all duration-300
          ${
            isActive
              ? `bg-gradient-to-r from-emerald-500/10 to-teal-500/10 
               text-emerald-500 dark:text-emerald-400`
              : `text-gray-600 dark:text-gray-300 
               hover:text-emerald-500 dark:hover:text-emerald-400`
          }
        `}
      >
        <motion.span
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
        <span>{children}</span>
        {isActive && (
          <motion.div
            layoutId="navIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

// Desktop Dropdown Component
function DesktopDropdown({ activeDropdown, setActiveDropdown, modules }) {
  const { darkMode } = useTheme();
  const location = useLocation();
  const isAnalysisActive = location.pathname.includes("/analysis");

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown("analysis")}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <motion.div
        variants={linkHoverVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/analysis"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            font-medium relative overflow-hidden
            transition-all duration-300
            ${
              isAnalysisActive
                ? `bg-gradient-to-r from-emerald-500/10 to-teal-500/10 
                 text-emerald-500 dark:text-emerald-400`
                : `text-gray-600 dark:text-gray-300 
                 hover:text-emerald-500 dark:hover:text-emerald-400`
            }
          `}
        >
          <Squares2X2Icon className="w-5 h-5" />
          <span>Analysis</span>
          <motion.div
            animate={{ rotate: activeDropdown === "analysis" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>

      <AnimatePresence>
        {activeDropdown === "analysis" && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              absolute left-0 mt-2 w-80 rounded-xl
              ${
                darkMode
                  ? "bg-gray-800/95 border border-gray-700/50"
                  : "bg-white/95 border border-gray-200/50"
              }
              backdrop-blur-lg shadow-lg
              overflow-hidden
            `}
          >
            <div className="p-2">
              {modules.map((module, index) => (
                <motion.div
                  key={module.path}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    },
                  }}
                >
                  <Link
                    to={module.path}
                    className={`
                      flex items-start gap-3 p-3 rounded-lg
                      transition-all duration-300
                      group relative overflow-hidden
                      ${
                        darkMode
                          ? "hover:bg-gray-700/50"
                          : "hover:bg-gray-50/80"
                      }
                    `}
                  >
                    <div
                      className={`
                      mt-1 p-2 rounded-lg
                      bg-gradient-to-r ${module.color} bg-opacity-10
                      group-hover:scale-110 transition-transform duration-300
                    `}
                    >
                      {module.icon}
                    </div>
                    <div>
                      <div
                        className={`
                        font-medium
                        ${darkMode ? "text-white" : "text-gray-900"}
                      `}
                      >
                        {module.name}
                      </div>
                      <div
                        className={`
                        text-sm
                        ${darkMode ? "text-gray-400" : "text-gray-600"}
                      `}
                      >
                        {module.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({ modules }) {
  const { darkMode } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 py-6 space-y-4"
    >
      <MobileNavLink to="/" icon={<HomeIcon className="w-5 h-5" />}>
        Home
      </MobileNavLink>

      {/* Mobile Analysis Section */}
      <div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            setExpandedSection(
              expandedSection === "analysis" ? null : "analysis"
            )
          }
          className={`
            w-full flex items-center justify-between
            px-4 py-3 rounded-lg
            ${darkMode ? "text-white" : "text-gray-900"}
            transition-all duration-300
          `}
        >
          <div className="flex items-center gap-2">
            <Squares2X2Icon className="w-5 h-5" />
            <span className="font-medium">Analysis</span>
          </div>
          <motion.div
            animate={{ rotate: expandedSection === "analysis" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {expandedSection === "analysis" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 ml-4 space-y-2 overflow-hidden"
            >
              {modules.map((module, index) => (
                <motion.div
                  key={module.path}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={module.path}
                    className={`
                      flex items-start gap-3 p-3 rounded-lg
                      transition-all duration-300
                      ${
                        darkMode
                          ? "hover:bg-gray-700/50"
                          : "hover:bg-gray-100/80"
                      }
                    `}
                  >
                    <div
                      className={`
                      mt-1 p-2 rounded-lg
                      bg-gradient-to-r ${module.color} bg-opacity-10
                    `}
                    >
                      {module.icon}
                    </div>
                    <div>
                      <div
                        className={`
                        font-medium
                        ${darkMode ? "text-white" : "text-gray-900"}
                      `}
                      >
                        {module.name}
                      </div>
                      <div
                        className={`
                        text-sm
                        ${darkMode ? "text-gray-400" : "text-gray-600"}
                      `}
                      >
                        {module.description}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileNavLink to="/connect" icon={<UserGroupIcon className="w-5 h-5" />}>
        Connect
      </MobileNavLink>

      <MobileNavLink to="/news" icon={<NewspaperIcon className="w-5 h-5" />}>
        News
      </MobileNavLink>

      <MobileNavLink to="/learn" icon={<BookOpenIcon className="w-5 h-5" />}>
        Learn
      </MobileNavLink>
    </motion.div>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ to, icon, children }) {
  const { darkMode } = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg
          font-medium transition-all duration-300
          ${
            isActive
              ? `bg-gradient-to-r from-emerald-500/10 to-teal-500/10 
               text-emerald-500 dark:text-emerald-400`
              : `${darkMode ? "text-white" : "text-gray-900"}
               hover:bg-gray-100/50 dark:hover:bg-gray-700/50`
          }
        `}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}

export default Navbar;
