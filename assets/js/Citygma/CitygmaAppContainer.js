import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";
import arrowUp from "../../images/arrow-up.png";
import arrowDown from "../../images/arrow-down.png";

export default function CitygmaAppContainer(props) {
    const { withBuddy } = props;

    let buddy = '';
    if (withBuddy) {
        buddy = <b>fears cause hesitations, hesitations makes your worth fears to be true</b>
    }

    let textTop = 0;

    const scrollUp = () => {
        if (-40 >= textTop) {
            textTop += 40;
            document.getElementById('homepageTextScroll').style.top = textTop+"px";
        }
    };

    const scrollDown = () => {
        let textHeight = 200-document.getElementById('homepageTextScroll').offsetHeight;
        console.log(textHeight);
        console.log(textTop);
        if (textHeight < textTop) {
            textTop -= 40;
            document.getElementById('homepageTextScroll').style.top = textTop + "px";
        }
    };


    return (
        <Fragment>
            <div id="homepageContainer">
                <div id="homepageBubble">
                    <div id="homepageText">
                        <div id="homepageTextScroll">
                            <div id="homepageTitle">
                                <h2>L'AGENCE CITYGMA A BESOIN DE VOUS POUR<br/>SAUVER LA CITÉE RENNAISE&nbsp;!</h2>
                            </div>
                            <div id="homepageTextContainer">
                                <p>Assistés de votre smartphone, déambulez dans les rues de Rennes au coeur d’une
                                    affaire brûlante.
                                    Résolvez des énigmes, suivez une piste grâce à votre GPS, plongez dans
                                    l’histoire de la ville et faites preuve d’audace&nbsp;!</p>
                                <p>Cliquez sur JOUER pour obtenir les dossiers confidentiels et commencer
                                    l’aventure&nbsp;!</p>
                            </div>
                        </div>
                    </div>
                    <div id="homepageTextBorder"></div>
                </div>
                <div id="homepageArrows">
                    <span onMouseDown={() => scrollUp()}><img src={arrowUp} alt=""/></span>
                    <span onClick={() => scrollDown()}><img src={arrowDown} alt=""/></span>
                </div>
                <div id="homepageImmeubles"></div>
                <div id="homepageImmeubleRight"></div>
                <NavLink to="/login"><span id="playButton">Jouer</span></NavLink>
            </div>
        </Fragment>
    );
}