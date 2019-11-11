import React from "react";
import {
    NavLink
} from "react-router-dom";
import onClickOutside from "react-onclickoutside";

export default function CitygmaNav(props) {
    const { burgerClicked, onBurgerClick } = props;


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
            </ul>
        </nav>
    );
}