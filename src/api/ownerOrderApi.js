import api from "./axios";

export const getRestaurantOrders = () => {
  return api.get("/orders/restaurant");
};

export const acceptOrder = (orderId) => {
  return api.patch(`/orders/${orderId}/accept`);
};

export const updateOrderStatus = (orderId, status) => {
  return api.patch(`/orders/${orderId}/status`, {
    status,
  });
};
