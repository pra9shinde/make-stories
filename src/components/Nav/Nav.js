import React from 'react';
import './Nav.css';

const Nav = () => {
    return (
        <header className='header-area'>
            <div className='main-menu'>
                <nav className='navbar'>
                    <div className='navbar-container max-window'>
                        <a className='navbar-logo'>MakeStories</a>

                        <div className='nav-items'>
                            <ul className='nav-menu'>
                                <li className='nav-item'>
                                    <a href=''>Home</a>
                                </li>
                                <li className='nav-item'>
                                    <a href=''>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Nav;
