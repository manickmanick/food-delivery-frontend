import { useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import RestaurantCard from "../components/restaurant/RestaurantCard";

import restaurantsData from "../data/restaurants";

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Biryani",
  "South Indian",
  "Chinese",
];

export default function RestaurantsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter((restaurant) => {
      const matchesSearch =
        restaurant.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : restaurant.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <MainLayout>
      <section className="bg-slate-50 min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-center text-5xl font-bold">
            Restaurants
          </h1>

          <div className="mx-auto mb-8 max-w-xl">
            <Input
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={
                  selectedCategory === category
                    ? ""
                    : "bg-gray-300 hover:bg-gray-400"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}