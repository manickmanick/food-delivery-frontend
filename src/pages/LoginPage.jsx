import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import useAuth from "../hooks/useAuth";
import { loginUser } from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser({
        email,
        password,
      });

      const { accessToken, user } = response.data.data;

      localStorage.setItem("token", accessToken);

      localStorage.setItem("user", JSON.stringify(user));

      login(user);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
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
              required={true}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
