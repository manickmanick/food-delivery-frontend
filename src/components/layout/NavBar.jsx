import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const cartCount = useSelector((state) => state.cart.count);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-3xl font-extrabold text-orange-500">
          Foodie
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="font-medium text-slate-700 hover:text-orange-500"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            className="font-medium text-slate-700 hover:text-orange-500"
          >
            Restaurants
          </Link>

          {user &&
            (user.role === "ADMIN" || user.role === "RESTAURANT_OWNER") && (
              <Link
                to="/restaurants/create"
                className="font-medium text-slate-700 hover:text-orange-500"
              >
                Add Restaurant
              </Link>
            )}

          {user?.role === "RESTAURANT_OWNER" && (
            <Link
              to="/menu/create"
              className="font-medium text-slate-700 hover:text-orange-500"
            >
              Add Menu Item
            </Link>
          )}

          {user && (
            <Link
              to="/addresses"
              className="font-medium text-slate-700 hover:text-orange-500"
            >
              Addresses
            </Link>
          )}

          {user && (
            <Link
              to="/orders"
              className="font-medium text-slate-700 hover:text-orange-500"
            >
              Orders
            </Link>
          )}

          {user ? (
            <button
              onClick={() => dispatch(logoutSuccess())}
              className="font-medium text-slate-700 hover:text-orange-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="font-medium text-slate-700 hover:text-orange-500"
            >
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="flex items-center gap-2 font-medium text-slate-700 hover:text-orange-500"
          >
            <ShoppingCart size={18} />
            Cart
            <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
