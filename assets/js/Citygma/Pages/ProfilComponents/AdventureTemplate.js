import React, {Fragment} from "react";

export default function AdventureTemplate(props) {

    const { cityAdventures } = props;


    return (
        <Fragment>
            {/*console.log(cityAdventures)*/}
            {cityAdventures && cityAdventures.map((cityAdventure) => (
                <div key={cityAdventure.adventureId}>
                    <div>{cityAdventure.adventureName}</div>
                    <div>{cityAdventure.adventureTown}</div>
                    <div>{cityAdventure.adventureDuration}</div>
                </div>
            ))}
        </Fragment>

    );
}