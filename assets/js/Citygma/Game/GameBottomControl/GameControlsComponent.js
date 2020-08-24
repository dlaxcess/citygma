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
            showNote: false,
            showQuestions: false,
        };

        this.burgerIconClick = this.burgerIconClick.bind(this);
        this.helpPictoClicked = this.helpPictoClicked.bind(this);
        this.loupeClicked = this.loupeClicked.bind(this);
        this.notePictoClicked = this.notePictoClicked.bind(this);
    }

    burgerIconClick(burgerClicked) {
        burgerClicked === false ? this.setState({ burgerClicked : true }) : this.setState({ burgerClicked : false });
    }

    helpPictoClicked() {
        this.state.showHelp ? this.setState({showHelp: false}) : this.setState({showHelp: true});
        this.state.showQuestions && this.setState({showQuestions: false});
        this.state.showNote && this.setState({showNote: false});
    }

    loupeClicked() {
        this.state.showHelp && this.setState({showHelp: false});
        this.state.showQuestions ? this.setState({showQuestions: false}) : this.setState({showQuestions: true});
        this.state.showNote && this.setState({showNote: false});
    }

    notePictoClicked() {
        this.state.showHelp && this.setState({showHelp: false});
        this.state.showQuestions && this.setState({showQuestions: false});
        this.state.showNote ? this.setState({showNote: false}) : this.setState({showNote: true});
    }

    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    render() {
        const { burgerClicked } = this.state;
        const {currentUser, onLogoutClick, onPersoPictoClick, onLoupeClick, userAdvance, adventure, enigmas, userGoodAnswersAdvance} = this.props;

        let enigmaAdvance = 0;

        if (userAdvance > 0.5/* && this.isFloat(userAdvance)*/) {
            enigmaAdvance = Math.round(userAdvance) -1;
        }


        let enigmasElements = enigmas.map((enigma, index) => {
            if (index < enigmaAdvance) {
                return (
                    <div key={enigma.enigmaId} className="noteContainer noteContent noteBookRaw">
                        <h3>{enigma.enigmaName}</h3>
                        <button className="marronButton">Revoir</button>
                    </div>
                );
            }
        });

        let questionsRecapElements = enigmas.map((enigma, index) => {
            if (index < enigmaAdvance && userAdvance >= index + 1.9) {
                if (!enigma.loopQuestionOff) {
                    return (
                            <div key={enigma.enigmaId} className="questionsContainer questionsContent questionRaw">
                                <h3>{enigma.enigmaName}</h3>
                                { userGoodAnswersAdvance[enigma.enigmaId] ? <p><u>Réponse trouvée :</u> {enigma.enigmaExpectedAnswer}</p> : <button className="marronButton">Re-tenter l'énigme</button> }
                            </div>

                    );
                }
            }
        });


        /*let displayEnigmas;
        for (let i = 0; i < 0; i++) {
            displayEnigmas += `<p>${enigmas[i].enigmaName}</p>`;
        }*/console.log('enigmasElements',enigmasElements);

        return (
            <Fragment>
                <div id="pageHelp" className={this.state.showHelp ? 'openedHelp' : ''}>
                    <span id="helpClose" onClick={this.helpPictoClicked}>X</span>
                    <h2>Aide</h2>
                    <div id="helpContainer">
                        <div id="helpContent">
                            <p>Pour ouvrir le message courrant de l&lsquo;aventure, veuillez cliquer sur le logo de citygma en bas à gauche de l&lsquo;écran</p>
                            <br/>
                            <p>En cliquant sur la loupe vous ouvrer l&lsquo;interface permettant de répondre à l&lsquo;énigme en cours... mais elle ne s&lsquo;affiche que si vous êtes assez proche du lieu concerné.</p>
                            <br/>
                            <p>En cliquant sur le livre, vous ouvrez vos notes. Dés que vous découvrez un nouveau lieu, l&lsquo;information historique lui correspondant est enregistrée dedans.</p>
                        </div>
                    </div>
                </div>
                <div id="questionsRecap" className={this.state.showQuestions ? 'openedQuestions' : ''}>
                    <span id="questionsClose" onClick={this.loupeClicked}>X</span>
                    <h2>Récap des énigmes</h2>
                    <div>
                        {(enigmas && questionsRecapElements[0]) ? questionsRecapElements : "Pas encore d'énigme à résoudre !"}
                    </div>
                </div>
                <div id="noteBook" className={this.state.showNote ? 'openedNote' : ''}>
                    <span id="noteClose" onClick={this.notePictoClicked}>X</span>
                    <h2>Notes aux benêts</h2>
                    <div>
                        <div key="intro" className="noteContainer noteContent noteBookRaw">
                            <h3>Vidéo d'introduction</h3>
                            <button className="marronButton">Revoir</button>
                        </div>
                        {(enigmas && enigmasElements[0]) ? enigmasElements : "Rien encore de noté !"}
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
                    <div id="pictoLoupe"><img src={pictoLoupe} alt="" onClick={this.loupeClicked}/></div>
                    <div id="pictoLivre"><img src={pictoLivre} alt="" onClick={this.notePictoClicked}/></div>
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