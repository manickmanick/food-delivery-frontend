import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { getMyOrders } from "../api/orderApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const response = await getMyOrders();

    setOrders(response.data.data);
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>

                    <p>{order.restaurant.name}</p>
                  </div>

                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5">
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.menuItem.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                <p className="mt-4 font-bold">₹{order.totalAmount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
