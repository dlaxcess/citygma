import React from "react";

export default function CitygmaNav(props) {
    const { burgerClicked } = props;

    return (
        <nav
            className={burgerClicked === true ? 'openedNav' : ''}
        >
            <ul>
                <li><a href="{{ path('homepage') }}">Acceuil</a></li>
                <li><a href="TODO">Connection / Inscription</a></li>
                <li><a href="TODO">Mentions légales</a></li>
            </ul>
        </nav>
    );
}