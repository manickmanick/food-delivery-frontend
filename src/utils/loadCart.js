import { getCart } from "../api/cartApi";

import { setCart } from "../redux/slices/cartSlice";

export const loadCart = async (dispatch) => {
  try {
    const response = await getCart();

    dispatch(setCart(response.data.data));
  } catch (error) {
    console.error(error);
  }
};
