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
import AddressesPage from "../pages/AddressesPage";
import OrdersPage from "../pages/OrdersPage";
import OwnerOrdersPage from "../pages/OwnerOrdersPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import EditAddressPage from "../pages/EditAddressPage";

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
      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <AddressesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addresses/:id/edit"
        element={
          <ProtectedRoute>
            <EditAddressPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/orders"
        element={
          <ProtectedRoute>
            <OwnerOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
