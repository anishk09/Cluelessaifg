import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./aws-config";


Amplify.configure(amplifyConfig);

type AppProps = {
  signOut: () => void;
  user: {
    username: string;
    attributes?: Record<string, any>;
  };
};

function App({ signOut, user }: AppProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        👗 Welcome to Clueless AI
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        Signed in as <strong>{user?.username}</strong>
      </p>
      <button
        onClick={signOut}
        style={{
          backgroundColor: "#ec4899",
          color: "white",
          padding: "0.6rem 1.2rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default withAuthenticator(App);
