import api from "./axios";

export const placeOrder = (addressId) =>
  api.post("/orders", {
    addressId,
  });

export const getMyOrders = () => api.get("/orders");

export const getOrderById = (id) => api.get(`/orders/${id}`);
