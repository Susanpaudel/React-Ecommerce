import './App.css';
import NavBar from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
   <>
    <Toaster position="top-right" reverseOrder={false} />
    <WishlistProvider>
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CartProvider>
    </WishlistProvider>
    </>
  );
}

export default App;
