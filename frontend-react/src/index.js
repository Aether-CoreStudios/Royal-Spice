import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import CartProvider from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CartProvider>
    <App />
  </CartProvider>,
);
