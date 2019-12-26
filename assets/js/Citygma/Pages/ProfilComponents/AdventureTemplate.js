import React, {Fragment} from "react";
import { uploadsDir } from "../../ConstData/uploadsDir";
import {NavLink} from "react-router-dom";
import { userService } from "../../../auth/services/userService";
import { history} from "../../../auth/helpers/history";

export default function AdventureTemplate(props) {

    const { cityAdventures } = props;


    return (
        <Fragment>
            {cityAdventures && cityAdventures.map((cityAdventure) => (
                <div key={cityAdventure.adventureId} className="adventureSolo">


                    <div className="adventureHeader">
                        <div className="adventureOffsetHeader">
                            <h3>{cityAdventure.adventureName}</h3>

                            <div className="adventureDownHead">
                                {cityAdventure.adventurePictureFilename &&
                                <div className="profilAdventuresImg" style={{backgroundImage: `url(${uploadsDir.getUploadsDir()}${cityAdventure.adventurePictureFilename}`}}></div>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="adventureDescription">
                        <div className="adventureDescriptionBack">
                            <div className="adventureDescriptionHeader">
                                <div className="headerNoWrap">
                                    {/*<div className="blankForImg">

                                    </div>*/}
                                    <div>
                                        <div className="adventureLinks">
                                            <NavLink to={{
                                                pathname: "/Jeu",
                                                state: {
                                                    adventureId: cityAdventure.adventureId
                                                }
                                            }}
                                                     className="marronButton white"
                                            >
                                                Jouer
                                            </NavLink>


                                            <button className="marronButton" onClick={() => { props.resetAdventureUserData(cityAdventure.adventureId) }}>Recommencer</button>
                                        </div>

                                    </div>
                                </div>

                                <div className="adventureInfos">
                                    <div><b>Ville :</b> {cityAdventure.adventureTown}</div>
                                    <div><b>Durée :</b> {cityAdventure.adventureDuration}</div>
                                </div>
                            </div>
                            <p><b>Description :</b> {cityAdventure.adventureDescription}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>

    );
}