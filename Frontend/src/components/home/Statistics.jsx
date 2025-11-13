// src/components/home/Statistics.jsx
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import CountUp from "react-countup";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  LightBulbIcon,
  IdentificationIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Statistics = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Disease Detection",
      value: 92,
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: LightBulbIcon,
      title: "Crop Recommendation",
      value: 88,
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Yield Prediction",
      value: 85,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: IdentificationIcon,
      title: "Species Identification",
      value: 90,
      color: "from-amber-500 to-orange-500",
    },
  ];

  // Monthly performance data
  const performanceData = [
    { month: "Oct 24", disease: 88, crop: 82, yield: 80, species: 85 },
    { month: "Nov 24", disease: 90, crop: 85, yield: 82, species: 87 },
    { month: "Dec 24", disease: 89, crop: 84, yield: 83, species: 88 },
    { month: "Jan 25", disease: 91, crop: 86, yield: 84, species: 89 },
    { month: "Feb 25", disease: 92, crop: 87, yield: 85, species: 89 },
    { month: "Mar 25", disease: 92, crop: 88, yield: 85, species: 90 },
  ];

  return (
    <section
      className={`py-24 relative overflow-hidden
      ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Animated Background */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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
              Platform Analytics
            </span>
          </motion.div>

          <h2
            className={`text-3xl md:text-4xl font-bold mb-4
            ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            AI-Powered Performance
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl p-6 overflow-hidden
                ${darkMode ? "bg-gray-800" : "bg-white"}
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
                className={`text-sm font-semibold mb-2
                ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {feature.title}
              </h3>

              <div
                className={`text-2xl font-bold
                bg-gradient-to-r ${feature.color} text-transparent bg-clip-text`}
              >
                <CountUp end={feature.value} duration={2} />%
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0"
                whileHover={{
                  background: darkMode
                    ? "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05))"
                    : "linear-gradient(to right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05))",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`rounded-2xl p-6 
            ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <h3
            className={`text-xl font-semibold mb-6
            ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Performance Trends
          </h3>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDisease" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCrop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpecies" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={
                    darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }
                />
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? "#9CA3AF" : "#4B5563"}
                />
                <YAxis
                  stroke={darkMode ? "#9CA3AF" : "#4B5563"}
                  domain={[75, 95]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: "none",
                    borderRadius: "0.5rem",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="disease"
                  name="Disease Detection"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorDisease)"
                />
                <Area
                  type="monotone"
                  dataKey="crop"
                  name="Crop Recommendation"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorCrop)"
                />
                <Area
                  type="monotone"
                  dataKey="yield"
                  name="Yield Prediction"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorYield)"
                />
                <Area
                  type="monotone"
                  dataKey="species"
                  name="Species Identification"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorSpecies)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
            ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <SparklesIcon className="w-5 h-5 text-emerald-500" />
            <span
              className={`text-sm font-medium
              ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Continuously improving through machine learning
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
