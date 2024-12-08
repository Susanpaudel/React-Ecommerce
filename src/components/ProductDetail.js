import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from './CartContext';
import { WishlistContext } from './WishlistContext';
import '../style/product-details.css';

export default function ProductDetail() {
    const url = 'https://fakestoreapi.com/products/';
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1); // Track the quantity

    useEffect(() => {
        const FetchSingleProduct = async () => {
            try {
                const response = await fetch(`${url}${id}`);
                if (!response.ok) throw new Error('Failed to load product');
                const single_product_data = await response.json();
                setProduct(single_product_data);
            } catch (error) {
                console.log(error);
            }
        };
        FetchSingleProduct();
    }, [id]);

    const { addToCart } = useContext(CartContext);
    const { addToWishlist } = useContext(WishlistContext);

    // Handle quantity change
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    return (
        <>
            {product ? (
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="main-img">
                                <img className="img-fluid" src={product.image} alt={product.title} />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="main-description px-2">
                                <div className="category text-bold">
                                    Category: {product.category}
                                </div>
                                <div className="product-title text-bold my-3">
                                    {product.title}
                                </div>

                                <div className="price-area my-4">
                                    <p className="old-price mb-1">${product.price}</p>
                                    <p className="text-secondary mb-1">(Additional tax may apply on checkout)</p>
                                </div>

                                <div className="buttons d-flex my-5">
                                    <div className="block">
                                        <button  onClick={() => addToWishlist({...product})} className="shadow btn custom-btn">Wishlist</button>
                                    </div>
                                    <div className="block">
                                        <button 
                                            onClick={() => addToCart({ ...product, quantity })} 
                                            className="shadow btn custom-btn"
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                    <div className="block quantity">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            value={quantity} // Display the current quantity
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="product-details my-4">
                                <p className="details-title text-color mb-1">Product Details</p>
                                <p className="description">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
