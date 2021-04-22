import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.css'

export default function Navbar() {
    return (
        <div className={s.navbar}>
            <NavLink to="/classic" activeClassName={s.activeLink}>
                Classic
            </NavLink>
            <NavLink to="/custom" activeClassName={s.activeLink}>
                Custom
            </NavLink>
        </div>
    );
}

