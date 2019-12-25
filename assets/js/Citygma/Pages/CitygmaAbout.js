import React, {Fragment} from "react";
import aboutPhotoMain from "../../../images/about/about-tel-main.jpg";
import aboutPhotoEnfant from "../../../images/about/about-enfant.jpg";
import aboutPhotoGroupe from "../../../images/about/about-groupe.jpg";
import {NavLink} from "react-router-dom";


export default function CitygmaAbout() {
    return (
        <Fragment>
            <div id="aboutContainer">
                <div id="aboutImmeubleLeft"></div>
                <div id="aboutVille"></div>
                <div id="aboutTextContainer">
                    <div id="aboutText">
                        <div className="clearFloat">
                            <h2>À l&lsquo;origine</h2>
                            <div className="imgAbout">
                                <img src={aboutPhotoMain} alt="Citygma jeu historique"/>
                            </div>
                            <div className="wrapTextAbout">
                                <p>
                                    C’est en 2015, après une longue balade dans le centre ville Rennais, que l’idée de créer une aventure interactive pour cultiver en amusant
                                    petits et grands commence à germer dans l’esprit des deux grands enfants à l’origine de Citygma.
                                    Pour se faire la main, ils organisent dans un premier temps des chasses au trésor pour les enfants dans des jardins privés.<br/>
                                    Le projet commence alors à prendre forme, ce n’est pas seulement un jeu de piste qu’ils veulent proposer mais une aventure avec une identité
                                    visuelle forte et des histoires bien ficelées pleines de rebondissements.<br/>
                                    Entre les recherches historiques, la création de l’univers graphique et l’écriture d’un premier scénario, l’association voit enfin le jour en 2018.
                                    Ce sera à Rennes que l’expérience commencera ! Rien d’étonnant pour les deux comparses qui arpentent les rues de la ville depuis leur plus tendre
                                    enfance de faire découvrir leur ville sous un nouvel angle.<br/>
                                    Rennais et voyageurs, l’agence Citygma vous attend !
                                </p>
                            </div>
                        </div>

                        <div className="clearFloat">
                            <h2>Un jeu riche en histoire</h2>
                            <div className="imgAbout">
                                <img src={aboutPhotoEnfant} alt="Citygma jeu historique"/>
                            </div>
                            <div className="wrapTextAbout">
                                <p>Citygma est un jeu d’enquêtes permettant de découvrir une ville et son histoire au travers d’énigmes à résoudre seul ou à plusieurs.
                                    Guidé par le GPS de son smartphone et des vidéos interactives, l’utilisateur navigue à la recherche d’indices sur un parcours rythmé
                                    d’énigmes mêlant architecture,  informations historiques et aventure loufoque.
                                    Une expérience familiale pour arpenter une ville sous un nouvel angle !
                                </p>
                            </div>
                        </div>

                        <div className="clearFloat">
                            <h2>Un jeu riche en histoire</h2>
                            <div className="imgAbout">
                                <img src={aboutPhotoGroupe} alt="Citygma jeu historique"/>
                            </div>
                            <div className="wrapTextAbout">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                            </div>
                        </div>
                        {/*<span id="playAbout"><h2>Jouer</h2></span>*/}

                    </div>
                </div>
            </div>
        </Fragment>
    );
}