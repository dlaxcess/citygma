import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import { history } from "../../auth/helpers/history";
import {adventureService } from "../Game/services/adventureService";

import AdventureTemplate from "./ProfilComponents/AdventureTemplate";
import ProfilForm from "./ProfilComponents/ProfilForm";


export default class CitygmaProfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null,
            cityAdventures: null
        };

        adventureService.getCityAdventures()
            .then(cityAdventures => {
                /*console.log(cityAdventures);*/
                this.setState({ cityAdventures: cityAdventures });
            });
    }

    componentDidMount() {
        userService.getCurrentUser().then(user => this.setState({ user }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        /*console.log(this.state);*/
        const { currentUser, user, cityAdventures } = this.state;

        {/*const cityAdventures = [
            { adventureId: 1, adventureName: 'fgfhf', adventureTown: 'dfghfgh', adventureDuration: '1h'}
        ];*/}



        return (
            <Fragment>
                <div id="profilContainer">
                    <div id="profilImmeubleLeft"></div>
                    <div id="profilContainerScroll">
                        <div id="profilTextContainer">
                            <div id="profilHeader">
                                <div id="profilName">
                                    {user && <h2>Bienvenue {user.username}</h2>}
                                    {currentUser && <div className="logoutButton" onClick={this.logout}>Déconnexion</div>}
                                </div>

                                <p>Choisissez votre aventure et cliquez sur &quot;Jouer&quot; pour commencer la partie, ou cliquez sur &quot;Continuer&quot; pour reprendre l'histoire là où vous en étiez.<br/>
                                Si vous souhaitez redémarrer l'aventure depuis le début, cliquez sur &quot;Recommencer&quot;</p>
                            </div>

                            <div id="profilAdventures">
                                <AdventureTemplate cityAdventures={cityAdventures}/>
                            </div>

                            <div id="profilForm">
                                <ProfilForm user={user}/>
                            </div>

                            {user &&
                                <p>Bienvenue {user.email}</p>
                            }
                            {user &&
                                <p>Bienvenue {user.roles[0]}</p>
                            }


                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}