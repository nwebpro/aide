import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Frontend = () => {
    return (
        <>
            <ScrollRestoration />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Frontend;