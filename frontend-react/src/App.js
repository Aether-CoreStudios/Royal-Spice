import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AIWaiter from "./components/AIWaiter";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // <-- ADD THIS
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import DeliveryMap from "./pages/DeliveryMap";
import Footer from "./components/Footer";
import Rooms from "./pages/Rooms";
import RoomBooking from "./pages/RoomBooking";
import AdminRoomBookings from "./pages/AdminRoomBookings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Welcome to Royal Spice 🍽️");
        }
      });
    }
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

        {/* ADD THIS ROUTE */}
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <AdminLogin setIsAdmin={setIsAdmin} />}
        />

        <Route path="/delivery-map" element={<DeliveryMap />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rooms" element={<Rooms />} />

        <Route path="/room-booking" element={<RoomBooking />} />

        <Route path="/admin-room-bookings" element={<AdminRoomBookings />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>

      <AIWaiter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
