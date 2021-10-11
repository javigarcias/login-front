import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <header className="header">
            <Link to="/">Home</Link>
            <Link to="/register">Login</Link>
        </header>
    )
}

export default Header;

