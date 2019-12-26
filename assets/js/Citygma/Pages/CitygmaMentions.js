import React, {Fragment} from "react";
import {userService} from "../../auth/services/userService";

export default function CitygmaMentions() {

    return (
        <Fragment>
            <div id="mentionsContainer">
                <div id="mentionsImmeubleLeft"></div>
                <div id="mentionsTextBorder"></div>
                <div id="mentionsTextContainer">
                    <h2>Mentions légales</h2>
                    <p>Ce site est développé par l'association Illuminaction à Rennes</p><br/>

                    <p><b>Conception et réalisation graphique :</b></p>
                    <p>Un remerciement tout particulier à Bim's qui nous a grâcieusement offert ses talent afin de concevoir la charte graphique ainsi que les illustrations de ce site.</p><br/>

                    <h3>Hébergeur du site</h3>
                    <h4>1&1 IONOS SARL</h4>
                    <p>7, place de la Gare<br/>
                        BP 70109<br/>
                        57200 Sarreguemines C<br/><br/>

                        1&1 IONOS SE<br/>
                        Elgendorfer Str. 57<br/>
                        56410 Montabaur, Allemagne</p><br/>

                    <h3>Politique relative à l'utilisation des cookies</h3>
                    <p>Les cookies utilisé sur ce site ne servent qu&lsquo;à son bon fonctionnement (Connexion du joueur, accès à l&lsquo;interface de jeu).</p>
                    <p>Il vous est tout à fait possible de les désactiver dans votre navigateur, auquel cas vous ne pourrez plus accéder ni à votre profil, ni à l&lsquo;interface de jeu.</p>
                    <br/>

                    <h3>Politique relative à l&lsquo;utilisation de données personnelles</h3>
                    <p>Nous ne récoltons aucunes données personnelles, excepté votre e-mail.</p>
                    <p>Celui ci ne nous sert qu&lsquo;à être sur de générer un identifiant unique pour la connection à votre compte. Nous nous engageons à ne pas nous en servir à quelqu'autre fin que ce soit.</p>
                    <br/>
                    <p>Lorsque vous nous contactez à l&lsquo;aide du formulaire de la page de contact, vous nous communiquez votre adresse mail. Nous nous engageons à l&lsquo;utiliser uniquement pour vous répondre.</p>
                </div>
            </div>
        </Fragment>
    );
}