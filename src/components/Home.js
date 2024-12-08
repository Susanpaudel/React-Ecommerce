import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function Home() {
  const base_url = 'https://fakestoreapi.com/';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${base_url}products`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const product_data = await response.json();
        setProducts(product_data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!!</div>;

  return (
    <>
      <h1>Our Products</h1>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 col-lg-4 p-2" key={product.id}>
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p>
                    <strong>Price: ${product.price}</strong>
                  </p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary me-2">
                    View Detail
                  </Link>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
