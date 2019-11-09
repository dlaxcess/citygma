import React, {Fragment} from "react";

export default function CitygmaAppContainer(props) {
    const { withBuddy } = props;

    let buddy ='';
    if (withBuddy) {
        buddy = <b>fears cause hesitations, hesitations makes your worth fears to be true</b>
    }

    return (
        <Fragment>
            <div id="homepageContainer">
                <div id="homepageBubble">
                    <div id="homepageText">
                        <div id="homepageTitle">
                            <h2>L'AGENCE CITYGMA A BESOIN DE VOUS POUR<br/>SAUVER LA CITÉE RENNAISE&nbsp;!</h2>
                        </div>
                        <div id="homepageTextContainer">
                            <p>Assistés de votre smartphone, déambulez dans les rues de Rennes au coeur d’une affaire brûlante.
                                Résolvez des énigmes, suivez une piste grâce à votre GPS, plongez dans l’histoire de la ville et faites preuve d’audace&nbsp;!</p>
                            <p>Cliquez sur JOUER pour obtenir les dossiers confidentiels et commencer l’aventure&nbsp;!</p>
                        </div>
                    </div>
                    <div id="homepageTextBorder"></div>
                </div>
                <div id="homepageImmeubles"></div>
                <div id="homepageImmeubleRight"></div>
                <span id="playButton">Jouer</span>
            </div>
        </Fragment>
    );
}