import React, { useEffect, useState, useContext } from 'react';
import { WishlistContext } from './WishlistContext';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';


function Wishlist() {
  const { wishlist, removeFromWishlist,clearWishlist } = useContext(WishlistContext); 
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container">
      
      <div className="divTable div-hover mt-5">
        {wishlist.length>0 &&
      <button onClick={clearWishlist} className='btn btn-danger mb-2 r-0 d-block'>Reomve All</button>
    }
        <div className="rowTable bg-primary text-white pb-2">
          <div className="divTableCol">Product</div>
          <div className="divTableCol">Actions</div>
        </div>

        {/* Cart Items */}
        {wishlist.length > 0 &&
          wishlist.map((product, index) => (
            <div className="rowTable" key={index}>
              <div className="divTableCol">
                <div className="media">
                  <div className="pull-left mr-2 ml-0 cart-image">
                    <img className="img-fluid" src={product.image} alt="Cart Item" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="divTableCol">
              <button type='button'
                    className="btn btn-secondary mx-2"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <span className="fa fa-remove"></span> Remove
                </button>
              </div>
            </div>
          ))}

       
      </div>
    </div>
  );
}

export default Wishlist;
