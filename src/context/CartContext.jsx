import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === menuItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
      return;
    }

    setCartItems([
      ...cartItems,
      {
        ...menuItem,
        quantity: 1,
      },
    ]);
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
