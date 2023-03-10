import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import Hero from './Hero/Hero';
import Product from './Product';

const Home = () => {
    const [addToCart, setAddToCart] = useState([])
    const { data:products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/products`)
            const data = await res.json()
            return data
        }
    })
    const allProducts = products.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const handleAddToCart = selectedProduct => {
        let newCart = [];
        const exists = addToCart.find(product => product._id === selectedProduct._id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...addToCart, selectedProduct];
        }else{
            const rest = addToCart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setAddToCart(newCart)
    }
    return (
        <>
            <Hero />
            <div className='py-10 md:py-16 lg:py-20 '>
                <section className='container mx-auto px-4 md:px-0'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            allProducts?.map(product => (
                                <Product key={product._id} product={product} addToCart={addToCart} handleAddToCart={handleAddToCart} />
                            ))
                        }
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;