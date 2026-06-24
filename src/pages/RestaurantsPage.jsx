import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";

import RestaurantCard from "../components/restaurant/RestaurantCard";

import { getRestaurants } from "../api/restaurantApi";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await getRestaurants();

      setRestaurants(response.data.data);
    } catch (error) {
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [restaurants, search]);

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-10 text-center text-5xl font-bold">Restaurants</h1>

          <div className="mx-auto mb-10 max-w-xl">
            <Input
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p className="text-center">Loading restaurants...</p>}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
