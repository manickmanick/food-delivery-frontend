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
      console.error("Error loading checkout data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedAddress) return;

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
        <div className="flex min-h-[60vh] items-center justify-center text-lg font-medium text-gray-500">
          Loading checkout summary...
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
                {addresses.length === 0 ? (
                  <p className="text-gray-500 py-4">
                    No addresses found. Please add an address to continue.
                  </p>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition duration-200 ${
                        selectedAddress === address.id
                          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800">
                        {address.label}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {address.addressLine1}
                      </p>
                      {address.addressLine2 && (
                        <p className="text-gray-600">{address.addressLine2}</p>
                      )}
                      <p className="text-gray-600">
                        {address.city}, {address.state}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {address.pincode}
                      </p>
                      {address.landmark && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                          Landmark: {address.landmark}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="space-y-4">
                {cart?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-gray-100 pb-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.menuItem.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ₹{Number(item.menuItem.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{cart?.totalAmount || 0}</span>
                </div>

                {/* Helpful Validation Message */}
                {!selectedAddress && (
                  <p className="mt-4 text-center text-sm font-medium text-red-500 animate-pulse bg-red-50 py-2 rounded-lg border border-red-100">
                    ⚠️ Please select a delivery address to proceed
                  </p>
                )}

                <Button
                  className="mt-4 w-full"
                  onClick={handleContinue}
                  disabled={!selectedAddress}
                >
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
