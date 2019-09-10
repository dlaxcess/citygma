import React from "react";
import CitygmaNav from "./CitygmaNav";

export default function CitygmaHeaderContainer(props) {
    const { burgerClicked, onBurgerClick } = props;

    return (
        <header>
                <span
                    onClick={() => onBurgerClick(burgerClicked)}
                >
                    x
                </span>
            <CitygmaNav
                burgerClicked={burgerClicked}
            />
        </header>
    );
}