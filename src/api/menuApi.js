import api from "./axios";

export const getRestaurantMenu = (restaurantId) => {
  return api.get(`/menu-items/restaurant/${restaurantId}`);
};

export const createMenuItem = (data) => {
  return api.post("/menu-items", data);
};

