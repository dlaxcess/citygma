import React, {Fragment} from "react";
import { uploadsDir } from "../../ConstData/uploadsDir";
import {NavLink} from "react-router-dom";

export default function AdventureTemplate(props) {

    const { cityAdventures } = props;


    return (
        <Fragment>
            {cityAdventures && cityAdventures.map((cityAdventure) => (
                <div key={cityAdventure.adventureId}>
                    <div className="adventureHeader">

                        <h3>{cityAdventure.adventureName}</h3>
                        <div className="adventureDownHead">
                            {cityAdventure.adventurePictureFilename &&
                                <div className="profilAdventuresImg" style={{background: `url(${uploadsDir.getUploadsDir()}${cityAdventure.adventurePictureFilename}`}}></div>
                            }
                            <div>
                                <div className="adventureLinks">
                                    <NavLink to="/Jeu" className="marronButton">Jouer</NavLink>
                                    <NavLink to="/Jeu" className="marronButton">Recommencer</NavLink>
                                </div>
                                <div className="adventureInfos">
                                    <div>Ville : {cityAdventure.adventureTown}</div>
                                    <div>Durée :{cityAdventure.adventureDuration}</div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div>Description : {cityAdventure.adventureDescription}</div>
                </div>
            ))}
        </Fragment>

    );
}