import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-white py-4 px-4 lg:px-0'>
           <div className='text-center text-sm'>
                <p className='text-center'>Copyright © 2022 - { new Date().getFullYear() } <Link to='/' className='text-theme-primary'>Aide.</Link> All Rights Reserved. Developed By  <a href='https://www.linkedin.com/in/developernaeem/' className='text-theme-primary' target={'_blank'} rel="noreferrer">Ab Naeem.</a></p>
            </div> 
        </footer>
    );
};

export default Footer;