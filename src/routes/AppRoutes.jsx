import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RestaurantsPage from "../pages/RestaurantsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/restaurants" element={<RestaurantsPage />} />
    </Routes>
  );
}
