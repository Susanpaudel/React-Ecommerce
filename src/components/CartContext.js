import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart data from sessionStorage or set to an empty array
  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
        // Check if the product already exists in the cart
        const isProductInCart = prevCart.some((item) => item.id === product.id);

        if (isProductInCart) {
          toast.success(`${product.title} Product Updated in the cart!`, {
            id: `update-${product.id}`, // Unique ID to prevent duplicate toasts
          });
            // If the product is already in the cart, update its quantity and totalPrice
            return prevCart.map((item) =>
                item.id === product.id
                    ? { 
                        ...item, 
                        quantity: item.quantity + (product.quantity || 1), // Add the new quantity or default to 1
                        totalPrice: (item.quantity + (product.quantity || 1)) * item.price 
                    }
                    : item
            );
        }
          // If product is not in the cart, add it
      toast.success(`${product.title} Product Added to the cart!`, {
        id: `add-${product.id}`, // Unique ID to prevent duplicate toasts
      });
        // If the product isn't in the cart, add it with the specified or default quantity
        return [
            ...prevCart,
            { 
                ...product, 
                quantity: product.quantity || 1, // Default to 1 if not provided
                totalPrice: (product.quantity || 1) * product.price // Calculate totalPrice with default quantity
            }
        ];
    });
};


  // Remove product from the cart by its id
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    if(count(cart)==0){
      if (sessionStorage.getItem('couponCode')) {
      sessionStorage.removeItem('couponCode');
      }
      if (sessionStorage.getItem('discount')) {
      sessionStorage.removeItem('discount');
      }
    }
    toast.success(`Product Remove from the cart!`);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    if (sessionStorage.getItem('couponCode')) {
      sessionStorage.removeItem('couponCode');
      }
      if (sessionStorage.getItem('discount')) {
      sessionStorage.removeItem('discount');
      }
    toast.success(`All Product Remove from the cart!`);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
