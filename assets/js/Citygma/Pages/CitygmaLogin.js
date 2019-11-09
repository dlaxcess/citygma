import React, {Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";

export default function CitygmaLogin() {
    return (
        <Fragment>
            <div id="loginContainer">
                <div id="loginImmeubleLeft"></div>
                <div id="loginTextContainer">
                    <img src={persoCitygma} alt=""/>
                    <p>login</p>
                    <input type="text"/>
                    <p>login</p>
                    <input type="text"/>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                    <p>login</p>
                </div>
            </div>
        </Fragment>
    );
}