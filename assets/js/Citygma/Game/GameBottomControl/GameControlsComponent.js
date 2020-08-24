import React, {Component, Fragment} from "react";

import CitygmaNav from "../../../Header/CitygmaNav";

import logoGame from "../../../../images/logo-citygma.png";
import pictoInterrog from "../../../../images/picto-interogation.png";
import pictoLoupe from "../../../../images/picto-loupe.png";
import pictoLivre from "../../../../images/picto-livre.png";
import LateEnigmaQuestionAnswer from "../EnigmaQuestionAnswerComponent/LateEnigmaQuestionAnswer";


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
        this.handleQuestionClick = this.handleQuestionClick.bind(this);
        this.handleVideoReplayClick = this.handleVideoReplayClick.bind(this);
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

    handleQuestionClick(id, questionPicture, questionText) {
        this.props.handleDisplayLateEnigmaQuestion(id, questionPicture, questionText);
        this.setState({showQuestions: false});
    }

    handleVideoReplayClick(playbackVideoUrl) {
        this.props.handleDisplayPlaybackVideo(playbackVideoUrl);
    }

    render() {
        const { burgerClicked } = this.state;
        const {currentUser, onLogoutClick, onPersoPictoClick, onLoupeClick, userAdvance, adventure, enigmas, userGoodAnswersAdvance, handleDisplayLateEnigmaQuestion} = this.props;

        let enigmaAdvance = 0;

        if (userAdvance > 0.5/* && this.isFloat(userAdvance)*/) {
            enigmaAdvance = Math.round(userAdvance) -1;
        }


        let enigmasElements = enigmas.map((enigma, index) => {
            if (index < enigmaAdvance && userAdvance >= index + 1.5 && userAdvance < index + 1.8) {
                if (!enigma.loopFirstVidOff) {
                    return (
                        <div key={enigma.enigmaId} className="noteContainer noteContent noteBookRaw">
                            <h3>{enigma.enigmaName}</h3>
                            <button className="marronButton" onClick={() => this.handleVideoReplayClick(enigma.enigmaVideoIntroClue)}>Revoir video indice</button>
                        </div>
                    );
                }
            } else if (index < enigmaAdvance && userAdvance >= index + 1.8) {
                if (enigma.loopFirstVidOff) {
                    return (
                        <div key={enigma.enigmaId} className="noteContainer noteContent noteBookRaw">
                            <h3>{enigma.enigmaName}</h3>
                            <button className="marronButton" onClick={() => this.handleVideoReplayClick(enigma.enigmaVideoHistoryInfo)}>Revoir video info historique</button>
                        </div>
                    );
                } else {
                    return (
                        <div key={enigma.enigmaId} className="noteContainer noteContent noteBookRaw">
                            <h3>{enigma.enigmaName}</h3>
                            <button className="marronButton" onClick={() => this.handleVideoReplayClick(enigma.enigmaVideoIntroClue)}>Revoir video indice </button>
                            <button className="marronButton" onClick={() => this.handleVideoReplayClick(enigma.enigmaVideoHistoryInfo)}>Revoir video info historique</button>
                        </div>
                    );
                }
            }
        });

        let questionsRecapElements = enigmas.map((enigma, index) => {
            if (index < enigmaAdvance && index < enigmas.length -1) {
                if (userAdvance >= index + 2.7)
                if (!enigma.loopQuestionOff) {
                    return (
                        <div key={enigma.enigmaId} className="questionsContainer questionsContent questionRaw">
                            <h3>{enigma.enigmaName}</h3>
                            { userGoodAnswersAdvance[enigma.enigmaId] ? <p><u>Réponse trouvée :</u> {enigma.enigmaExpectedAnswer}</p> : <button className="marronButton" onClick={() => this.handleQuestionClick(enigma.enigmaId, enigma.enigmaQuestionPicture, enigma.enigmaQuestionText)}>Re-tenter l'énigme</button> }
                        </div>

                    );
                } else {
                    return;
                }
            } else if (index === enigmas.length -1) {
                if (userAdvance > index + 2.7)
                    if (!enigma.loopQuestionOff) {
                        return (
                            <div key={enigma.enigmaId} className="questionsContainer questionsContent questionRaw">
                                <h3>{enigma.enigmaName}</h3>
                                { userGoodAnswersAdvance[enigma.enigmaId] ? <p><u>Réponse trouvée :</u> {enigma.enigmaExpectedAnswer}</p> : <button className="marronButton" onClick={() => this.handleQuestionClick(enigma.enigmaId, enigma.enigmaQuestionPicture, enigma.enigmaQuestionText)}>Re-tenter l'énigme</button> }
                            </div>

                        );
                    } else {
                        return;
                    }
            }
        });


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
                        {(enigmas && questionsRecapElements.find(element => typeof element != 'undefined' )/*[0]*/) ? questionsRecapElements : "Pas encore d'énigme passée !"}
                    </div>
                </div>
                <div id="noteBook" className={this.state.showNote ? 'openedNote' : ''}>
                    <span id="noteClose" onClick={this.notePictoClicked}>X</span>
                    <h2>Notes aux benêts</h2>
                    <div>
                        <div key="intro" className="noteContainer noteContent noteBookRaw">
                            <h3>Vidéo d'introduction</h3>
                            <button className="marronButton" onClick={() => this.handleVideoReplayClick(adventure.videoAdventureIntroFilename)}>Revoir</button>
                        </div>
                        {(enigmas && enigmasElements[0]) && enigmasElements }
                        { (enigmaAdvance > enigmas.length && !adventure.adventureLastVidOff) ?
                            <Fragment>
                                <div key="fin" className="noteContainer noteContent noteBookRaw">
                                <h3>Vidéo d'indice final</h3>
                                <button className="marronButton" onClick={() => this.handleVideoReplayClick(adventure.videoLastEnigmaFilename)}>Revoir</button>
                                </div>
                            </Fragment> : ''
                        }
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