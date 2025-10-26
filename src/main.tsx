import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./aws-config"; // <-- initialize Amplify before App

createRoot(document.getElementById("root")!).render(
  <App />
);
