import React from "react";
import CitygmaNav from "./CitygmaNav";

export default function CitygmaHeaderContainer(props) {
    const { burgerClicked, onBurgerClick } = props;

    return (
        <header>
                <span
                    onClick={() => onBurgerClick(burgerClicked)}
                >
                    <div id="burgerButton" title="Menu principal">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </span>
            <CitygmaNav
                burgerClicked={burgerClicked}
            />
        </header>
    );
}