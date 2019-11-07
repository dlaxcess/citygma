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
                            <p>Bienvenue sur la page d'accueil de Citygma</p>
                            <p>yo! {buddy}</p>
                        </div>
                        <div id="homepageContainer">
                            <p>Citygma est un jeu d'enquête à résoudre dans une ville pour la visiter en apprenant sur son histoire tout en s'amusant.</p>
                            <p>Citygma est un jeu d'enquête à résoudre dans une ville pour la visiter en apprenant sur son histoire tout en s'amusant.</p>
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