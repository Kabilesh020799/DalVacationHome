import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import awsconfig from "./config/awsConfig";
import { Amplify } from "aws-amplify";
import "./index.css";
import ChatProvider from "./components/support-chat/ChatProvider.jsx";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
