import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function CartPage() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    console.log(cartItems, 'cartItems');
    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    const rest = cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price; // Assuming each item has a 'price' property
    }, 0);
    console.log(rest, 'ghg');

    function calculateGST(value) {
        return (value * 28) / 100
    }


    const Gst = calculateGST(rest)
    const grandTotal = rest + Gst + 10
    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                {item.title} - ${item.price}
                                <button onClick={() => removeFromCart(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <div>Total :{rest}</div>
                        <div>GST 28% :{Gst}</div>
                        <div>Shipping Charge : $10</div>
                        <div>Grand Total : {grandTotal}</div>
                    </div>
                </>

            )}
        </div>
    );
}

export default CartPage;

