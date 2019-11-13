import React, {Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";

export default function CitygmaLogin(props) {
    const { onUserCreateSubmit, onUserConnectSubmit } = props;

    function handleUserCreateSubmit(e) {
        e.preventDefault();

        onUserCreateSubmit(
            e.target.elements.namedItem('playerMail').value,
            e.target.elements.namedItem('playerPass').value
        );
    }

    function handleUserConnectSubmit(e) {
        e.preventDefault();

        onUserConnectSubmit(
            e.target.elements.namedItem('connectPlayerMail').value,
            e.target.elements.namedItem('connectPlayerPass').value
        );
    }

    return (
        <Fragment>
            <div id="loginContainer">

                <div id="loginTextContainer">
                    <img src={persoCitygma} alt=""/>
                    <div className="loginForm">
                        <form onSubmit={handleUserCreateSubmit}>
                            <label htmlFor="playerMail">E-mail</label>
                            <input type="text" name="playerMail" id="playerMail"/>
                            <label htmlFor="playerPass">Mot de passe</label>
                            <input type="text" name="playerPass" id="playerPass"/>
                            <div id="loginSubmit">
                                <input type="submit" id="loginSubmitButton" value="S'inscrire"/>
                            </div>
                        </form>

                        <form onSubmit={handleUserConnectSubmit}>
                            <label htmlFor="connectPlayerMail">E-mail</label>
                            <input type="text" name="connectPlayerMail" id="connectPlayerMail"/>
                            <label htmlFor="connectPlayerPass">Mot de passe</label>
                            <input type="text" name="connectPlayerPass" id="connectPlayerPass"/>
                            <div id="loginSubmit">
                                <input type="submit" id="loginSubmitButton" value="Connexion"/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}