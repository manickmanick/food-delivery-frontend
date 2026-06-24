import api from "./axios";

export const getRestaurants = () => {
  return api.get("/restaurants");
};

export const getRestaurant = (id) => {
  return api.get(`/restaurants/${id}`);
};

export const createRestaurant = (data) => {
  return api.post("/restaurants", data);
};
