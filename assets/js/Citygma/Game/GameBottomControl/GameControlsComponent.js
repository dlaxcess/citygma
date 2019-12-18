import React, {Component, Fragment} from "react";

import CitygmaNav from "../../../Header/CitygmaNav";

import logoGame from "../../../../images/logo-citygma.png";
import pictoInterrog from "../../../../images/picto-interogation.png";
import pictoLoupe from "../../../../images/picto-loupe.png";
import pictoLivre from "../../../../images/picto-livre.png";


export default class GameControlsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            burgerClicked : false,
        };

        this.burgerIconClick = this.burgerIconClick.bind(this);
    }

    burgerIconClick(burgerClicked) {
        burgerClicked === false ? this.setState({ burgerClicked : true }) : this.setState({ burgerClicked : false });
    }

    render() {
        const { burgerClicked } = this.state;
        const {currentUser, onLogoutClick} = this.props;

        return (
            <Fragment>
                <div id="gameControls">
                    <div id="principalControlRow">
                        <div id="gameCitygmaPicto"><img src={logoGame} alt="logo-game"/></div>
                        <div id="gameBurgerButton" title="Menu principal"
                             className={burgerClicked === true ? 'activeBurger' : ''}
                             onClick={() => this.burgerIconClick(burgerClicked)}
                        >
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                    </div>
                    <div id="pictoInterrog"><img src={pictoInterrog} alt=""/></div>
                    <div id="pictoLoupe"><img src={pictoLoupe} alt=""/></div>
                    <div id="pictoLivre"><img src={pictoLivre} alt=""/></div>
                </div>
                <div id="gameNav">
                    <CitygmaNav
                        burgerClicked={burgerClicked}
                        onBurgerClick={this.burgerIconClick}
                        currentUser={currentUser}
                        onLogoutClick={onLogoutClick}
                    />
                </div>
            </Fragment>
        );
    }
}