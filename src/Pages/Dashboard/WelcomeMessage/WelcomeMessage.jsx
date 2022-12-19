import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const WelcomeMessage = () => {
    const { user } = useContext(AuthContext)
    return (
        <section className='bg-theme-secondary py-5 px-5 rounded' data-aos='fade-up' data-aos-duration='1000'>
            <h3 className='text-lg md:text-2xl lg:text-3xl font-bold mb-1'>Welcome, { user?.displayName }. 👋</h3>
            <p className='text-base text-theme-body'>Here is what’s happening with your projects today.</p>
        </section>
    );
};

export default WelcomeMessage;