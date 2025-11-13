// src/pages/Home.jsx
import { useEffect } from "react";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
// import Services from "../components/home/Services";
import Statistics from "../components/home/Statistics";
import CommunityHighlight from "../components/home/CommunityHighlight";
import LearningSection from "../components/home/LearningSection";
import NewsPreview from "../components/home/NewsPreview";
// import Testimonials from "../components/home/Testimonials";
// import LatestNews from "../components/home/LatestNews";
// import CTASection from "../components/home/CTASection";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#0f172a]" : "bg-[#f8fafc]"}`}
    >
      <Hero />
      <Features />
      <Statistics />
      <CommunityHighlight />
      <NewsPreview />
      <LearningSection />

      {/* <Services />
      <Testimonials />
      <LatestNews />
      <CTASection /> */}
    </div>
  );
};

export default Home;
