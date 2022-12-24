import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const Frontend = () => {
    return (
        <>
            <Header />
            <ScrollRestoration />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Frontend;