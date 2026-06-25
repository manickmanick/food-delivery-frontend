import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 2. Client-side Form Validation
  const validateForm = () => {
    const localErrors = {};

    if (!form.name.trim()) {
      localErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      localErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      localErrors.email = "Please enter a valid email address";
    }

    if (!form.password.trim()) {
      localErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      localErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    try {
      setLoading(true);
      await registerUser(form);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrors({
        api: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // 3. Helper to update form fields and automatically wipe out their errors on type
  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (errors.api) {
      setErrors((prev) => ({ ...prev, api: "" }));
    }
  };

  return (
    <MainLayout>
      <section className="min-h-[85vh] bg-slate-50 py-20 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-gray-100">
          <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mb-8 text-center text-slate-500">
            Register to start ordering food
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name Block */}
            <div>
              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                hasError={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-500 pl-1">
                  ⚠️ {errors.name}
                </p>
              )}
            </div>

            {/* Email Block */}
            <div>
              <Input
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                hasError={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs font-medium text-red-500 pl-1">
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            {/* Password Block */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                hasError={!!errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-xs font-medium text-red-500 pl-1">
                  ⚠️ {errors.password}
                </p>
              )}
            </div>

            {/* API Response Fallback Error Alert */}
            {errors.api && (
              <div className="rounded-xl border border-red-200 bg-red-50/50 px-4 py-3 text-sm text-red-600 font-medium">
                ❌ {errors.api}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-3.5 mt-2"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <p className="text-center text-sm text-slate-500 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-500 hover:text-orange-600 transition"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
