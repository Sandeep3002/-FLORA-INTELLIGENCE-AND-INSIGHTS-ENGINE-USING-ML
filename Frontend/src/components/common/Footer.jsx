// src/components/common/Footer.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  HomeIcon,
  UserGroupIcon,
  NewspaperIcon,
  BookOpenIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

function Footer() {
  const { darkMode } = useTheme();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/", icon: <HomeIcon className="w-4 h-4" /> },
        {
          name: "Analysis",
          path: "/analysis",
          icon: <Squares2X2Icon className="w-4 h-4" />,
        },
        {
          name: "Connect",
          path: "/connect",
          icon: <UserGroupIcon className="w-4 h-4" />,
        },
        {
          name: "News",
          path: "/news",
          icon: <NewspaperIcon className="w-4 h-4" />,
        },
        {
          name: "Learn",
          path: "/learn",
          icon: <BookOpenIcon className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Analysis Tools",
      links: [
        { name: "Disease Detection", path: "/analysis/disease-detection" },
        { name: "Yield Prediction", path: "/analysis/yield-prediction" },
        {
          name: "Species Identification",
          path: "/analysis/species-identification",
        },
        { name: "Soil Analysis", path: "/analysis/soil-analysis" },
        { name: "Crop Recommendation", path: "/analysis/crop-recommendation" },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          icon: <EnvelopeIcon className="w-5 h-5" />,
          content: "support@floraai.com",
        },
        {
          icon: <PhoneIcon className="w-5 h-5" />,
          content: "+91 1234567890",
        },
      ],
    },
  ];

  return (
    <footer
      className={`
      border-t border-gray-200/10
      ${darkMode ? "bg-gray-900" : "bg-white"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
                <img
                  src="/src/assets/images/logo.png"
                  alt="Flora AI"
                  className="h-8 w-8"
                />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                Flora AI
              </span>
            </Link>
            <p
              className={`mt-4 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Empowering agriculture through artificial intelligence. Making
              plant care and crop management more accessible and efficient.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links?.map((link) => (
                  <li key={link.name}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={link.path}
                        className={`
                          flex items-center gap-2 text-sm
                          ${
                            darkMode
                              ? "text-gray-400 hover:text-emerald-400"
                              : "text-gray-600 hover:text-emerald-500"
                          }
                          transition-colors duration-300
                        `}
                      >
                        {link.icon && <span>{link.icon}</span>}
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
                {section.items?.map((item, index) => (
                  <li key={index}>
                    <div
                      className={`
                      flex items-center gap-2 text-sm
                      ${darkMode ? "text-gray-400" : "text-gray-600"}
                    `}
                    >
                      {item.icon}
                      <span>{item.content}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={`
          mt-12 pt-8 border-t
          ${darkMode ? "border-gray-800" : "border-gray-200"}
          flex flex-col sm:flex-row justify-between items-center
        `}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2025 Flora AI. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link
              to="/privacy"
              className={`text-sm ${
                darkMode
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-500"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`text-sm ${
                darkMode
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-500"
              }`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
