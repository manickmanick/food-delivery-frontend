import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
 console.log("Login clicked", email);
  const handleSubmit = (e) => {
    e.preventDefault();

    login(email);

    navigate("/");
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-20">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
          <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
