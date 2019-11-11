import React, {Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";

export default function CitygmaLogin() {
    return (
        <Fragment>
            <div id="loginContainer">

                <div id="loginTextContainer">
                    <img src={persoCitygma} alt=""/>
                    <div className="loginForm">
                        <label for="playerMail">E-mail</label>
                        <input type="text" name="playerMail" id="playerMail"/>
                        <label htmlFor="playerPass">Mot de passe</label>
                        <input type="text" name="playerPass" id="playerPass"/>
                        <div id="loginSubmit">
                            <span id="loginSubmitButton">Connexion</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}