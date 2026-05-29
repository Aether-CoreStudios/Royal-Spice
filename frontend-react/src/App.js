import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIWaiter from "./components/AIWaiter";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DeliveryMap from "./pages/DeliveryMap";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    Notification.requestPermission();

    new Notification("Welcome to Royal Spice 🍽️");
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/reservation" element={<Reservation />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <AdminLogin setIsAdmin={setIsAdmin} />}
        />

        <Route path="/delivery-map" element={<DeliveryMap />} />
      </Routes>
      <AIWaiter />
    </BrowserRouter>
  );
}

export default App;
