import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomeScreen } from "./components/HomeScreen";
import { ClosetScreen } from "./components/ClosetScreen";
import { AnalyticsScreen } from "./components/AnalyticsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "closet" | "analytics" | "profile"
  >("home");

  const handleRefresh = () => {
    // In a real app, this would fetch a new outfit recommendation
    console.log("Refreshing outfit...");
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onRefresh={handleRefresh} />;
      case "closet":
        return <ClosetScreen />;
      case "analytics":
        return <AnalyticsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen onRefresh={handleRefresh} />;
    }
  };

  return (
    <div className="size-full bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}