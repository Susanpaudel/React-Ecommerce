import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext); // Access cart and removeFromCart from context
  const [carts, setCarts] = useState([]); // Local state for cart items
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Sync local carts state with cart context whenever it changes
  useEffect(() => {
    setCarts(cart);
  }, [cart]);

  // Load coupon code and discount from session storage on mount
  useEffect(() => {
    const storedCouponCode = sessionStorage.getItem('couponCode');
    const storedDiscount = sessionStorage.getItem('discount');
    if (storedCouponCode) setCouponCode(storedCouponCode);
    if (storedDiscount) setDiscount(parseFloat(storedDiscount));
  }, []);

  // Handle quantity change for an item
  const handleQuantityChange = (cart_id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities

    setCarts((prevCarts) => {
      const updatedCarts = prevCarts.map((cart) => {
        if (cart.id === cart_id) {
          return { ...cart, quantity: newQuantity, totalPrice: newQuantity * cart.price };
        }
        return cart;
      });

      sessionStorage.setItem('cart', JSON.stringify(updatedCarts)); // Save to session storage
      return updatedCarts;
    });
  };

  // Handle applying the coupon
  const handleApplyCoupon = () => {
    const validCouponCode = 'TEST'; // Replace with your actual valid coupon code
    const discountAmount = 100; // Discount value for the coupon

    if (couponCode.toUpperCase() === validCouponCode) {
      setDiscount(discountAmount);
      sessionStorage.setItem('couponCode', couponCode);
      sessionStorage.setItem('discount', discountAmount);
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code!');
    }
  };

  // Calculate the total price
  const calculateTotal = () => {
    const subtotal = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
    return subtotal - discount > 0 ? subtotal - discount : 0; // Ensure total is not negative
  };

  const subtotal = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
  const total = calculateTotal();

  return (
    <div className="container">
      <div className="divTable div-hover mt-5">
        {cart.length > 0 && (
          <div className="d-block">
            <div className="d-flex justify-content-between mb-2">
              <div className="coupen-code d-flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="form-control"
                  placeholder="Enter Coupon Code"
                />
                <button type="button" onClick={handleApplyCoupon} className="btn btn-primary">
                  Apply Coupon
                </button>
              </div>
              <button onClick={clearCart} className="btn btn-danger mb-2 r-0 d-block">
                Remove All
              </button>
            </div>
          </div>
        )}
        <div className="rowTable bg-primary text-white pb-2">
          <div className="divTableCol">Product</div>
          <div className="divTableCol">Quantity</div>
          <div className="divTableCol">Price</div>
          <div className="divTableCol">Total</div>
          <div className="divTableCol">Actions</div>
        </div>

        {/* Cart Items */}
        {carts.length > 0 &&
          carts.map((cart, index) => (
            <div className="rowTable" key={index}>
              <div className="divTableCol">
                <div className="media">
                  <div className="pull-left mr-2 ml-0 cart-image">
                    <img className="img-fluid" src={cart.image} alt="Cart Item" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <Link to={`/product/${cart.id}`}>{cart.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="divTableCol">
                <input
                  type="number"
                  className="form-control"
                  value={cart.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(cart.id, parseInt(e.target.value))}
                />
              </div>
              <div className="divTableCol">
                <strong>${cart.price.toFixed(2)}</strong>
              </div>
              <div className="divTableCol">
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
              <div className="divTableCol">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeFromCart(cart.id)}
                >
                  <span className="fa fa-remove"></span> Remove
                </button>
              </div>
            </div>
          ))}

        {/* Totals */}
        {carts.length > 0 ? (
          <>
            <div className="rowTable">
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol">
                <h5>Subtotal</h5>
              </div>
              <div className="divTableCol">
                <h5>
                  <strong>${subtotal.toFixed(2)}</strong>
                </h5>
              </div>
            </div>
            {discount > 0 && (
              <div className="rowTable">
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol">
                  <h5>Discount</h5>
                </div>
                <div className="divTableCol">
                  <h5>
                    <strong>-${discount.toFixed(2)}</strong>
                  </h5>
                </div>
              </div>
            )}
            <div className="rowTable">
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol">
                <h3>Total</h3>
              </div>
              <div className="divTableCol">
                <h3>
                  <strong>${total.toFixed(2)}</strong>
                </h3>
              </div>
            </div>
            <div className="rowTable">
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol"></div>
              <div className="divTableCol">
                <button type="button" className="btn btn-default col-6">
                  Go Back
                </button>
              </div>
              <div className="divTableCol">
                <button type="button" className="btn btn-success">
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="rowTable">
            <div className="divTableCol text-center">
              <h3>Your cart is empty.</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
