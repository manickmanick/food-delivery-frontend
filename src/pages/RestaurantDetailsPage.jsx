import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getRestaurant }
from "../api/restaurantApi";

import {
  getRestaurantMenu,
} from "../api/menuApi";

import MenuItemCard
from "../components/menu/MenuItemCard";

export default function RestaurantDetailsPage() {
  const { id } = useParams();

  const [restaurant,
    setRestaurant] =
    useState(null);

  const [menuItems,
    setMenuItems] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData =
    async () => {

      try {

        const [
          restaurantResponse,
          menuResponse,
        ] = await Promise.all([
          getRestaurant(id),
          getRestaurantMenu(id),
        ]);

        setRestaurant(
          restaurantResponse.data.data
        );

        setMenuItems(
          menuResponse.data.data
        );

      } catch (error) {

        setError(
          "Failed to load restaurant"
        );

      } finally {

        setLoading(false);

      }
    };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-center">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-red-500">
          {error}
        </div>
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

          <h1 className="text-5xl font-bold">
            {restaurant.name}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            {restaurant.description}
          </p>

          <p className="mt-4 text-lg">
            📍 {restaurant.address}
          </p>

          <p className="mt-2 text-lg">
            ⭐ {restaurant.rating}
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            Menu
          </h2>

          {menuItems.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center shadow">
              No menu items available
            </div>
          ) : (
            <div className="space-y-5">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </MainLayout>
  );
}