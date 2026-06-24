import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Button from "../components/ui/Button";

import { getAddresses } from "../api/addressApi";
import { getCart } from "../api/cartApi";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [addressResponse, cartResponse] = await Promise.all([
        getAddresses(),
        getCart(),
      ]);

      setAddresses(addressResponse.data.data);

      setCart(cartResponse.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    navigate("/payment", {
      state: {
        addressId: selectedAddress,
        amount: cart.totalAmount,
      },
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-10 text-4xl font-bold">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Address Section */}

            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="mb-6 text-2xl font-bold">Delivery Address</h2>

              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      selectedAddress === address.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold">{address.label}</h3>

                    <p>{address.addressLine1}</p>

                    {address.addressLine2 && <p>{address.addressLine2}</p>}

                    <p>
                      {address.city}, {address.state}
                    </p>

                    <p>{address.pincode}</p>

                    {address.landmark && <p>Landmark: {address.landmark}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}

            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                {cart?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">{item.menuItem.name}</p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{Number(item.menuItem.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>₹{cart?.totalAmount || 0}</span>
                </div>

                <Button className="mt-6 w-full" onClick={handleContinue}>
                  Continue To Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
