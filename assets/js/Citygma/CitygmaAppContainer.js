import React, {Fragment} from "react";

export default function CitygmaAppContainer(props) {
    const { withBuddy } = props;

    let buddy ='';
    if (withBuddy) {
        buddy = <b>fears cause hesitations, hesitations makes your worth fears to be true</b>
    }

    return (
        <Fragment>
            <div id="homepageTitle">
                <h2>Bienvenue sur la page d'accueil de Citygma</h2>
                <h3>yo! {buddy}</h3>
            </div>
            <div id="homepageContainer">
                <p>Citygma est un jeu d'enquête</p>
            </div>
        </Fragment>
    );
}