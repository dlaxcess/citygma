import React, {Fragment} from "react";
import CitygmaNav from "./CitygmaNav";
import logo from "../../images/logo-citygma.svg";
import logotext from "../../images/logo-texte-citygma.svg";

export default function CitygmaHeaderContainer(props) {
    const { burgerClicked, onBurgerClick } = props;

    return (
        <Fragment>
            <header>
                <img src={logo} alt="Citygma"/>
                <img src={logotext} alt="Citygma"/>
                <div id="burgerButton" title="Menu principal"
                     className={burgerClicked === true ? 'activeBurger' : ''}
                     onClick={() => onBurgerClick(burgerClicked)}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </header>
            <CitygmaNav
                burgerClicked={burgerClicked}
            />
        </Fragment>
    );
}