import React from "react";
import CitygmaNav from "./CitygmaNav";

export default function CitygmaHeaderContainer(props) {
    const { burgerClicked, onBurgerClick } = props;

    return (
        <div>
                <span
                    onClick={() => onBurgerClick(burgerClicked)}
                >
                    x
                </span>
            <CitygmaNav
                burgerClicked={burgerClicked}
            />
        </div>
    );
}