import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RestaurantsPage from "../pages/RestaurantsPage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/restaurants" element={<RestaurantsPage />} />

      <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
    </Routes>
  );
}
