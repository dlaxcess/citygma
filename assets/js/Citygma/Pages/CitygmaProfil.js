import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import { history } from "../../auth/helpers/history";
import {adventureService} from "../Game/services/adventureService";

export default class CitygmaProfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null,
            cityAdventures: null
        };
    }

    componentDidMount() {
        userService.getCurrentUser().then(user => this.setState({ user }));

        adventureService.getCityAdventures()
            .then(cityAdventures => {
                console.log(cityAdventures);
                this.setState({ cityAdventures });
            });
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, user, cityAdventures } = this.state;

        return (
            <Fragment>
                <div>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
                    <p>Profil</p>
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
                    {console.log(currentUser)}
                    {user && console.log(user.username)}
                    {user && console.log(user.roles[0])}
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