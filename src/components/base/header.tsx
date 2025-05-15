import React from 'react';
import { Button } from '../ui/button';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const navData = [
        { title: 'Products', link: '/products'},
        { title: 'Categories', link: '/categories'},
        { title: 'Blog', link: '/blog'},
        { title: 'Contact', link: '/contact'},
    ]
    return (
        <header className='flex flex-row items-center justify-between'>
            <NavLink to={'/'} className='text-2xl font-bold text-primary uppercase'>Tika</NavLink>
            <div className='flex flex-row items-center gap-6'>
                {navData.map(({ title, link}, index) => {
                    return (
                        <NavLink key={index} to={link} className={'capitalize hover:underline hover:text-primary mx-5'}>{title}</NavLink>
                    )
                })}
            </div>
            <div className='flex flex-row items-center gap-2'>
                <Button variant={'default'} asChild>
                        <Link to={'/login'}>Login</Link>
                </Button>
               <Button variant={'secondary'} asChild>
                        <Link to={'/register'}>Register</Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;