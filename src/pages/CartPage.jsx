import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";

import useCart from "../hooks/useCart";

export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalAmount,
  } = useCart();

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">

          <h1 className="mb-10 text-4xl font-bold">
            Cart
          </h1>

          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl bg-white p-5 shadow"
              >
                <div className="flex justify-between">

                  <div>
                    <h2 className="font-semibold">
                      {item.name}
                    </h2>

                    <p>
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <Button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </Button>

                    <span>
                      {item.quantity}
                    </span>

                    <Button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </Button>
                  </div>

                </div>
              </div>
            ))}

          </div>

          <div className="mt-10 rounded-xl bg-white p-6 shadow">
            <h2 className="text-2xl font-bold">
              Total: ₹{totalAmount}
            </h2>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}