import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './nav.modules.css';
import { WishlistContext } from '../WishlistContext';

function Nav() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-xl">
        <Link className="navbar-brand" to="/">
          <img
            src="https://codingyaar.com/wp-content/uploads/coding-yaar-logo.png"
            alt="Brand Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          <div className="user-icons d-flex mb-2">
            <div className="cart ms-5">
              <Link to="/cart">
                <i className="bi bi-cart"></i> ({cart.length})
              </Link>
            </div>
            <div className="cart">
              <Link to="/wishlist">
                <i className="bi bi-heart"></i> ({wishlist.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
