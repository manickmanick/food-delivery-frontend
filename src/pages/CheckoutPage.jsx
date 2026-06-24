import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Button from "../components/ui/Button";

import { getCart } from "../api/cartApi";

import { getAddresses } from "../api/addressApi";

import { placeOrder } from "../api/orderApi";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [cartResponse, addressResponse] = await Promise.all([
      getCart(),
      getAddresses(),
    ]);

    setCart(cartResponse.data.data);

    setAddresses(addressResponse.data.data);

    const defaultAddress = addressResponse.data.data.find((a) => a.isDefault);

    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Select address");

      return;
    }

    await placeOrder(Number(selectedAddress));

    navigate("/orders");
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-2xl font-semibold">Select Address</h2>

            <div className="space-y-3">
              {addresses.map((address) => (
                <label key={address.id} className="flex gap-3">
                  <input
                    type="radio"
                    value={address.id}
                    checked={Number(selectedAddress) === address.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />

                  <div>
                    <p className="font-medium">{address.label}</p>

                    <p>{address.addressLine1}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">Total: ₹{cart?.totalAmount}</h2>

            <Button className="mt-5" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
