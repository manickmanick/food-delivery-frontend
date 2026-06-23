import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  console.log("Navbar rendered");

  const auth = useAuth();

  console.log("Navbar auth:", auth);

  const { user, logout } = auth;

  console.log("Navbar User:", user);

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
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

          {user ? (
            <button
              onClick={logout}
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
