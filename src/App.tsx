import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomeScreen } from "./components/HomeScreen";
import { ClosetScreen } from "./components/ClosetScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "home" | "closet" | "profile"
  >("home");

  const handleRefresh = () => {
    toast.success("Generating new outfit recommendation...");
    // In a real app, this would fetch a new outfit recommendation
    setTimeout(() => {
      toast.success("New outfit is ready!");
    }, 1500);
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
    setActiveTab("home");
  };

  // Show landing page if not authenticated and not on login page
  if (!isAuthenticated && !showLogin) {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <Toaster />
      </>
    );
  }

  // Show login page
  if (!isAuthenticated && showLogin) {
    return (
      <>
        <LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />
        <Toaster />
      </>
    );
  }

  // Render main app screens
  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onRefresh={handleRefresh} />;
      case "closet":
        return <ClosetScreen />;
      case "profile":
        return <ProfileScreen onLogout={handleLogout} />;
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
      <Toaster />
    </div>
  );
}