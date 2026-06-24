import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Button from "../components/ui/Button";

import { placeOrder } from "../api/orderApi";

export default function PaymentPage() {

  const location = useLocation();

  const navigate = useNavigate();

  const {
    amount,
    addressId,
  } = location.state;

  const handlePay =
    async () => {

      try {

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              2000
            )
        );

        await placeOrder(
          addressId
        );

        navigate(
          "/order-success"
        );

      } catch (error) {

        console.error(
          error
        );

      }
    };

  return (
    <MainLayout>

      <div className="mx-auto max-w-md p-6">

        <h1 className="mb-6 text-3xl font-bold">
          Payment
        </h1>

        <div className="rounded-lg bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-bold">
            Amount:
            ₹{amount}
          </h2>

          <input
            className="mb-4 w-full rounded border p-3"
            placeholder="Card Number"
          />

          <input
            className="mb-4 w-full rounded border p-3"
            placeholder="Expiry"
          />

          <input
            className="mb-4 w-full rounded border p-3"
            placeholder="CVV"
          />

          <Button
            className="w-full"
            onClick={
              handlePay
            }
          >
            Pay ₹{amount}
          </Button>

        </div>

      </div>

    </MainLayout>
  );
}