import React from "react";
import {
    NavLink
} from "react-router-dom";

export default function CitygmaNav(props) {
    const { burgerClicked } = props;

    return (
        <nav
            className={burgerClicked === true ? 'openedNav' : ''}
        >
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Connection / Inscription</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/Mentions">Mentions légales</NavLink></li>
            </ul>
        </nav>
    );
}