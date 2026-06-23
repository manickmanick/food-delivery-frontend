import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RestaurantsPage from "../pages/RestaurantsPage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/restaurants" element={<RestaurantsPage />} />

      <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
