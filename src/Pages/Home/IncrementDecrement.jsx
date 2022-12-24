import React from 'react';

const IncrementDecrement = ({ exists, decrementCart, incrementCart }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='cursor-pointer font-semibold py-1 px-5 w-full text-center border hover:bg-theme-primary hover:text-white hover:border-theme-primary transition duration-300' onClick={() => decrementCart(exists._id)}> - </div>
            <p className='py-1 px-5 w-full text-center border-y'>{exists.quantity}</p>
            <div className='cursor-pointer font-semibold border py-1 px-5 w-full text-center hover:bg-theme-primary hover:text-white hover:border-theme-primary transition duration-300' onClick={() => incrementCart(exists._id)}> + </div>
        </div>
    );
};

export default IncrementDecrement;