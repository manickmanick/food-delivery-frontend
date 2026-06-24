import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RestaurantsPage from "../pages/RestaurantsPage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import CreateRestaurantPage from "../pages/CreateRestaurantPage";
import CreateMenuItemPage from "../pages/CreateMenuItemPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/restaurants" element={<RestaurantsPage />} />

      <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurants/create"
        element={
          <AdminRoute>
            <CreateRestaurantPage />
          </AdminRoute>
        }
      />
      <Route
        path="/menu/create"
        element={
          <AdminRoute>
            <CreateMenuItemPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
