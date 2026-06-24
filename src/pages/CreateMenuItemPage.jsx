import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { getRestaurants } from "../api/restaurantApi";

import { getCategories } from "../api/categoryApi";

import { createMenuItem } from "../api/menuApi";

export default function CreateMenuItemPage() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    restaurantId: "",
    categoryId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const restaurantResponse = await getRestaurants();

      const categoryResponse = await getCategories();

      setRestaurants(restaurantResponse.data.data);

      setCategories(categoryResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMenuItem({
        ...form,
        price: Number(form.price),

        restaurantId: Number(form.restaurantId),

        categoryId: Number(form.categoryId),
      });

      navigate("/restaurants");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create menu item");
    }
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-8 text-3xl font-bold">Create Menu Item</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="Menu Item Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <Input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />

            <Input
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl: e.target.value,
                })
              }
            />

            <select
              className="w-full rounded-lg border p-3"
              value={form.restaurantId}
              onChange={(e) =>
                setForm({
                  ...form,
                  restaurantId: e.target.value,
                })
              }
            >
              <option value="">Select Restaurant</option>

              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-lg border p-3"
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              Create Menu Item
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
