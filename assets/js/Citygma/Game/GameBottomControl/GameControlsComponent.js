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
            showHelp: false,
        };

        this.burgerIconClick = this.burgerIconClick.bind(this);
        this.helpPictoClicked = this.helpPictoClicked.bind(this);
    }

    burgerIconClick(burgerClicked) {
        burgerClicked === false ? this.setState({ burgerClicked : true }) : this.setState({ burgerClicked : false });
    }

    helpPictoClicked() {
        this.state.showHelp ? this.setState({showHelp: false}) : this.setState({showHelp: true});
    }

    render() {
        const { burgerClicked } = this.state;
        const {currentUser, onLogoutClick, onPersoPictoClick} = this.props;

        return (
            <Fragment>
                <div id="pageHelp" className={this.state.showHelp ? 'openedHelp' : ''}>
                    <span id="helpClose" onClick={this.helpPictoClicked}>X</span>
                    <h2>Aide</h2>
                    <div id="helpContainer">
                        <div id="helpContent">
                            <p>Pour ouvrir le message courrant de l&lsquo;aventure, veuillez cliquer sur le logo de citygma en bas à gauche de l&lsquo;écran</p>
                        </div>
                    </div>
                </div>
                <div id="gameControls">
                    <div id="principalControlRow">
                        <div id="gameCitygmaPicto"><img src={logoGame} alt="logo-game" onClick={onPersoPictoClick}/></div>
                        <div id="gameBurgerButton" title="Menu principal"
                             className={burgerClicked === true ? 'activeBurger' : ''}
                             onClick={() => this.burgerIconClick(burgerClicked)}
                        >
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                    </div>
                    <div id="pictoInterrog"><img src={pictoInterrog} alt="" onClick={this.helpPictoClicked}/></div>
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