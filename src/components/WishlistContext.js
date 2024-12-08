import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Load initial Wishlist data from sessionStorage or set to an empty array
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = sessionStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Save wishlist data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to the wishlist, increase quantity by 1 if product already exists
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      // Check if the product already exists in the wishlist
      const exists = prevWishlist.some((i) => i.id === product.id);
  
      if (exists) {
        toast.success(`Product Already in Wishlist!`);
        return prevWishlist; // No change
      }
  
      toast.success(`Product Added to Wishlist!`);
      return [...prevWishlist, product];
    });
  };

  // Remove product from the wishlist by its id
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((i) => i.id !== id));
    toast.success(`Product Remove to the wishlist!`);
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    toast.success(`All Product Remove from Wishlist!`);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
