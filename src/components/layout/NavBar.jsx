import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Foodie
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-orange-500">
            Home
          </Link>

          <Link to="/restaurants" className="font-medium hover:text-orange-500">
            Restaurants
          </Link>

          <Link to="/login" className="font-medium hover:text-orange-500">
            Login
          </Link>

          <Link to="/cart" className="font-medium hover:text-orange-500">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
