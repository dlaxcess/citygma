import React from "react";
import {
    NavLink
} from "react-router-dom";
import onClickOutside from "react-onclickoutside";

export default function CitygmaNav(props) {
    const { burgerClicked, onBurgerClick, currentUser, onLogoutClick } = props;


    return (
        <nav
            className={burgerClicked === true ? 'openedNav' : ''}
            onMouseLeave={() => onBurgerClick(burgerClicked)}
        >
            <ul>
                <li><p><NavLink to="/">Home</NavLink></p></li>
                <li><p><NavLink to="/login">Connection / Inscription</NavLink></p></li>
                <li><p><NavLink to="/about">About</NavLink></p></li>
                <li><p><NavLink to="/Mentions">Mentions légales</NavLink></p></li>
                {currentUser &&
                    <li onClick={onLogoutClick}><p>Logout</p></li>
                }
            </ul>
        </nav>
    );
}