// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import DiseaseDetection from "./components/analysis/DiseaseDetection";
import YieldPrediction from "./components/analysis/YieldPrediction";
import SpeciesIdentification from "./components/analysis/SpeciesIdentification";
import SoilAnalysis from "./components/analysis/SoilAnalysis";
import Footer from "./components/common/Footer";
import CropRecommendation from "./components/analysis/CropRecommendation";
import Connect from "./pages/Connect";
import News from "./pages/News";
import Learn from "./pages/Learn";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div
          className="min-h-screen bg-gray-50 dark:bg-gray-900 
                      text-gray-900 dark:text-gray-100 transition-colors duration-200"
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route
              path="/analysis/disease-detection"
              element={<DiseaseDetection />}
            />

            <Route
              path="/analysis/yield-prediction"
              element={<YieldPrediction />}
            />

            <Route
              path="/analysis/species-identification"
              element={<SpeciesIdentification />}
            />
            <Route path="/analysis/soil-analysis" element={<SoilAnalysis />} />
            <Route
              path="/analysis/crop-recommendation"
              element={<CropRecommendation />}
            />
            {/* Add routes for other sections when they're ready */}
            <Route path="/connect" element={<Connect />} />
            <Route path="/news" element={<News />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
