import React, { useState } from 'react';
import IncrementDecrement from './IncrementDecrement';

const Product = ({ product, handleAddToCart, addToCart }) => {
    const [productCount, setProductCount] = useState(0)
    const exists = addToCart.find(item => item._id === product._id);
    

    const countUp = increment => {
        const exists = addToCart.find(p => p._id === increment)
        let productCount = exists.quantity
        exists.quantity = exists.quantity + 1
        setProductCount(productCount)
    }
    const countDown = decrement => {
        const exists = addToCart.find(p => p._id === decrement)
        let productCount = exists.quantity
        exists.quantity = exists.quantity - 1
        setProductCount(productCount)
    }

    return (
        <div key={product._id} className='bg-white p-5 hover:shadow-shadow transition duration-300 rounded'>
            <img src={product.image} alt={product.name} className='w-64 h-64 object-cover mb-5 mx-auto' />
            <div>
                <h2 className='text-xl text-theme-text font-semibold mb-3'>{product.name}</h2>
                <p className='text-lg mb-2 font-bold text-theme-primary'>৳ {product.price}</p>
                {
                    exists?.quantity >= 1 ?
                    <IncrementDecrement 
                        exists={exists}
                        countUp={countUp}
                        countDown={countDown}
                     />
                    :
                    <button onClick={() => handleAddToCart(product)} className={`bg-theme-primary text-white block text-center w-full py-2 hover:shadow-btn-shadow transition duration-300`}>Add To Cart</button>
                }
            </div>
        </div>
    );
};

export default Product;