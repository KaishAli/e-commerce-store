import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './ProductCard.css'
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
        <>

            <div className='cantainer-card' >

                <div className="card">
                    <img src={product.images[0]} alt="productStore" className="photoset" />
                    <div onClick={handleNavigateProductDes} className="container ">
                        <h4 className="hname">{product.title}</h4>
                        <p className="pname">${product.price}</p>
                    </div>
                    <div className="">

                        <button className="custom_buttonb" onClick={addToCart}>Add To Cart</button>
                        <button className="custom_buttonb">Buy</button>
                    </div>
                </div>
            </div>

            {/* <div className="product-card">
                <div >
                    <img src={product.images[0]} alt={product.title} />
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                </div>
                <button onClick={addToCart}>Add to Cart</button>

            </div > */}
        </>





    );
}

export default ProductCard;