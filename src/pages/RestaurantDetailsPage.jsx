import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import restaurants from "../data/restaurants";
import menuItems from "../data/menuItems";

import MenuItemCard from "../components/menu/MenuItemCard";

export default function RestaurantDetailsPage() {
  const { id } = useParams();

  const restaurant = restaurants.find(
    (r) => r.id === Number(id)
  );

  const menu = menuItems[id] || [];

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="p-10">
          Restaurant not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-slate-50 min-h-screen">

        <div className="h-80 bg-gradient-to-r from-orange-400 to-red-500" />

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-5xl font-bold">
            {restaurant.name}
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            {restaurant.cuisine}
          </p>

          <p className="mt-2 text-lg">
            ⭐ {restaurant.rating}
          </p>

          <h2 className="mt-12 mb-8 text-3xl font-bold">
            Menu
          </h2>

          <div className="space-y-5">
            {menu.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}