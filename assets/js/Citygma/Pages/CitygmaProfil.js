import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import { history } from "../../auth/helpers/history";
import {adventureService } from "../Game/services/adventureService";

import AdventureTemplate from "./ProfilComponents/AdventureTemplate";


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
                <div>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>

                    {/*<AdventureTemplate cityadventures={cityAdventures}/>*/}
                    {console.log(cityAdventures)}
                    <AdventureTemplate cityAdventures={cityAdventures}/>







                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    {currentUser &&
                        <a onClick={this.logout}>Logout</a>
                    }
                    {user &&
                        <p>Bienvenue {user.username}</p>
                    }
                    {user &&
                        <p>Bienvenue {user.email}</p>
                    }
                    {user &&
                        <p>Bienvenue {user.roles[0]}</p>
                    }
                    {/*console.log(currentUser)*/}
                    {/*user && console.log(user.username)*/}
                    {/*user && console.log(user.roles[0])*/}
                    {cityAdventures &&
                        <p>{cityAdventures[0].adventureDescription}</p>
                    }
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>

                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                </div>
            </Fragment>
        );
    }
}