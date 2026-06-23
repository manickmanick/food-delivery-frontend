import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>

          <div className="space-y-5">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <Button className="w-full">Register</Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
