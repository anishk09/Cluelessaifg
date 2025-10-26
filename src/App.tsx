import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type AppProps = {
  signOut: () => void;
  user: {
    username: string;
    attributes?: Record<string, any>;
  };
};

function App({ signOut, user }: AppProps) {
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

// Wrap with Amplify Authenticator
export default withAuthenticator(App);
