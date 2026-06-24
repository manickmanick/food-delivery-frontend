import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { createRestaurant } from "../api/restaurantApi";

export default function CreateRestaurantPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createRestaurant(form);

      navigate("/restaurants");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-3xl font-bold">Create Restaurant</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="Restaurant Name"
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
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <Input
              placeholder="Restaurant Image URL"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl: e.target.value,
                })
              }
            />

            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Restaurant Preview"
                className="h-56 w-full rounded-xl object-cover"
              />
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              {loading ? "Creating..." : "Create Restaurant"}
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
