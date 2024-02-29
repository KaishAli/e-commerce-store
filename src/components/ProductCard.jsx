import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function ProductCard({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    function handleNavigateProductDes() {
        navigate("/product", { state: product });
    }
    console.log(product.images[0], 'uygy');
    return (
        <div className="product-card">
            <div onClick={handleNavigateProductDes} >
                <img src={product.images[0]} alt={product.title} />
                <h2>{product.title}</h2>
                <p>${product.price}</p>
            </div>
            <button onClick={addToCart}>Add to Cart</button>

        </div >
    );
}

export default ProductCard;