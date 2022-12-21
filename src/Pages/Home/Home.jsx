import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import TopHeader from './TopHeader';

const Home = () => {
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

    return (
        <div className='bg-theme-secondary py-20'>
            <section className='container mx-auto px-4 md:px-0'>
                <TopHeader />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allProducts?.map(product => (
                            <div key={product._id} className='bg-white p-5 hover:shadow-shadow transition duration-300 rounded'>
                                <img src={product.image} alt={product.name} className='w-64 h-64 object-cover mb-5 mx-auto' />
                                <div>
                                    <h2 className='text-xl text-theme-text font-semibold mb-3'>{product.name}</h2>
                                    <p className='text-lg mb-2 font-bold text-theme-primary'>৳ {product.price}</p>
                                    <button className='bg-theme-primary text-white block text-center w-full py-2 hover:shadow-btn-shadow transition duration-300'>Add To Cart</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;