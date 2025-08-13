import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/noto-sans";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
