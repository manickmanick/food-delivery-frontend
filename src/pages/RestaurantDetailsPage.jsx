import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getRestaurant } from "../api/restaurantApi";

export default function RestaurantDetailsPage() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadRestaurant();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      const response = await getRestaurant(id);

      setRestaurant(response.data.data);
    } catch (error) {
      setError("Failed to load restaurant");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Loading restaurant...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-red-500">{error}</div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="p-10 text-center">Restaurant not found</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="h-80 w-full object-cover"
        />

        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-5xl font-bold">{restaurant.name}</h1>

          <p className="mt-4 text-lg text-slate-600">
            {restaurant.description}
          </p>

          <p className="mt-4 text-lg">📍 {restaurant.address}</p>

          <p className="mt-2 text-lg">⭐ {restaurant.rating}</p>

          <p className="mt-2">
            Status:
            <span
              className={`ml-2 font-semibold ${
                restaurant.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
