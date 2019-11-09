import React, {Fragment} from "react";
import aboutPhotoMain from "../../../images/about/about-tel-main.jpg";
import aboutPhotoEnfant from "../../../images/about/about-enfant.jpg";
import aboutPhotoGroupe from "../../../images/about/about-groupe.jpg";


export default function CitygmaAbout() {
    return (
        <Fragment>
            <div id="aboutContainer">
                <div id="aboutImmeubleLeft"></div>
                <div id="aboutVille"></div>
                <div id="aboutTextContainer">
                    <div id="aboutText">
                        <div className="clearFloat">
                            <h2>Un jeu riche en histoire</h2>
                            <div className="imgAbout">
                                <img src={aboutPhotoMain} alt="Citygma jeu historique"/>
                            </div>
                            <div className="wrapTextAbout">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                            </div>
                        </div>

                        <div className="clearFloat">
                            <h2>Un jeu riche en histoire</h2>
                            <div className="imgAbout">
                                <img src={aboutPhotoEnfant} alt="Citygma jeu historique"/>
                            </div>
                            <div className="wrapTextAbout">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
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
                        <span id="playAbout"><h2>Jouer</h2></span>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}