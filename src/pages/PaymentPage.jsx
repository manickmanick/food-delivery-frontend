import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import { placeOrder } from "../api/orderApi";
import { clearCartState } from "../redux/slices/cartSlice";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const amount = location.state?.amount || 0;
  const addressId = location.state?.addressId || null;

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Invalid card number structure";
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV must be at least 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await placeOrder(addressId);

      dispatch(clearCartState());
      navigate("/order-success");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-md p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Payment</h1>

        <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-100">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Amount: ₹{amount}
          </h2>

          <form onSubmit={handlePay} className="space-y-4">
            {/* Card Number Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                className={`w-full rounded-xl border p-3 outline-none transition ${
                  errors.cardNumber
                    ? "border-red-500 bg-red-50/30 focus:border-red-500"
                    : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                }`}
                placeholder="0000 0000 0000 0000"
              />
              {errors.cardNumber && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  ⚠️ {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry and CVV Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Expiry Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  maxLength="5"
                  className={`w-full rounded-xl border p-3 outline-none transition ${
                    errors.expiry
                      ? "border-red-500 bg-red-50/30 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  }`}
                  placeholder="MM/YY"
                />
                {errors.expiry && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    ⚠️ {errors.expiry}
                  </p>
                )}
              </div>

              {/* CVV Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="4"
                  className={`w-full rounded-xl border p-3 outline-none transition ${
                    errors.cvv
                      ? "border-red-500 bg-red-50/30 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  }`}
                  placeholder="•••"
                />
                {errors.cvv && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    ⚠️ {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-6 w-full py-3.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing Payment..." : `Pay ₹${amount}`}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
