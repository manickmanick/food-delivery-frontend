import { useState } from "react";

import { ShoppingCart, Menu, X } from "lucide-react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutSuccess } from "../../redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const cartCount = useSelector((state) => state.cart.count);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-3xl font-extrabold text-orange-500">
          Foodie
        </Link>

        {/* Desktop */}

        <nav className="hidden xl:flex items-center gap-8">
          <Link to="/">Home</Link>

          <Link to="/restaurants">Restaurants</Link>

          {user && <Link to="/orders">Orders</Link>}

          {user && <Link to="/addresses">Addresses</Link>}

          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart size={18} />
            Cart
            <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
              {cartCount}
            </span>
          </Link>

          {user &&
            (user.role === "ADMIN" || user.role === "RESTAURANT_OWNER") && (
              <Link to="/restaurants/create">Add Restaurant</Link>
            )}

          {user?.role === "RESTAURANT_OWNER" && (
            <Link to="/menu/create">Add Menu</Link>
          )}

          {user?.role === "RESTAURANT_OWNER" && (
            <Link to="/owner/orders" className="">
              Manage Orders
            </Link>
          )}

          {user ? (
            <button onClick={() => dispatch(logoutSuccess())}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        {/* Mobile Button */}

        <button
          className="xl:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="border-t bg-white xl:hidden">
          <div className="flex flex-col p-4">
            <Link to="/" className="py-3" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link
              to="/restaurants"
              className="py-3"
              onClick={() => setMobileOpen(false)}
            >
              Restaurants
            </Link>

            {user && (
              <Link
                to="/orders"
                className="py-3"
                onClick={() => setMobileOpen(false)}
              >
                Orders
              </Link>
            )}

            {user?.role === "RESTAURANT_OWNER" && (
              <Link to="/owner/orders" className="py-3">
                Manage Orders
              </Link>
            )}

            {user && (
              <Link
                to="/addresses"
                className="py-3"
                onClick={() => setMobileOpen(false)}
              >
                Addresses
              </Link>
            )}

            <Link
              to="/cart"
              className="py-3"
              onClick={() => setMobileOpen(false)}
            >
              Cart ({cartCount})
            </Link>

            {user &&
              (user.role === "ADMIN" || user.role === "RESTAURANT_OWNER") && (
                <Link
                  to="/restaurants/create"
                  className="py-3"
                  onClick={() => setMobileOpen(false)}
                >
                  Add Restaurant
                </Link>
              )}

            {user?.role === "RESTAURANT_OWNER" && (
              <Link
                to="/menu/create"
                className="py-3"
                onClick={() => setMobileOpen(false)}
              >
                Add Menu
              </Link>
            )}

            {user ? (
              <button
                className="py-3 text-left"
                onClick={() => {
                  dispatch(logoutSuccess());

                  setMobileOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-3"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
