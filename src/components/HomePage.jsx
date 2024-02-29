import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from './SearchBar';
import { fetchProductData } from '../API/getProductData';
function HomePage() {
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems.length);
    const [products, setProducts] = useState([]);
    const [productsCopy, setProductsCopy] = useState([]);
    const navigate = useNavigate()
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000); 
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData()
    }, []);

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const response = await fetchProductData();
            console.log(response, 'response');
            if (response && response.data && response.data.products) {
                setProducts(response.data.products);
                setProductsCopy(response.data.products);
                
            } else {
                console.error('No data found in the API response.');

            }
        } catch (error) {

        }
    }

    // Filter products based on price range and category
    const filteredProducts = products.filter(product => {
        const isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
        const isMatchingCategory = !category || product.category === category;
        return isInPriceRange && isMatchingCategory;
    });

    console.log(products);
    function handleCartNav() {
        navigate("/cart")
    }




    return (
        <div>
            <SearchBar products={products} setProducts={setProducts} productsCopy={productsCopy} />
            <div style={{ height: "60px", width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', background: "aliceBlue" }}>
                <span onClick={handleCartNav}>
                    <img src="" alt='shoppingcart' style={{ width: "25px", height: "25px", position: "relative" }} />
                    <span style={{ position: "absolute", zIndex: "49", top: "0px", right: "0px", color: "red", background: "lightskyblue", borderRadius: "50%", width: "15px", height: "21px", cursor: "pointer" }}>
                        {cartItems.length}
                    </span>
                </span>
                <div className="filters">

                    <label>Price Range:</label>
                    <select value={`${minPrice}-${maxPrice}`} onChange={e => {
                        const [min, max] = e.target.value.split('-').map(Number);
                        setMinPrice(min);
                        setMaxPrice(max === 1000 ? Infinity : max); // Handle "1000+" option
                    }}><option value="0-2000">All</option>
                        <option value="0-100">1 - 100</option>
                        <option value="100-200">100 - 200</option>
                        <option value="200-500">200 - 500</option>
                        <option value="500-1000">500 - 1000</option>
                        <option value="1000-">1000+</option>
                    </select>
                    <label>Category:</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="smartphones">Mobile</option>
                        <option value="laptops">laptop</option>
                        <option value="groceries">groceries</option>
                        <option value="skincare">skincare</option>
                        <option value="home-decoration">home-decoration</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
            </div>
            <h1>Product Catalog</h1>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard  key={product.id} product={product} />
                ))}
            </div>
        </div >
    );
}

export default HomePage;

