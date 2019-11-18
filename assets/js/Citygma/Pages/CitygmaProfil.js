import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import { history } from "../../auth/helpers/history";

export default class CitygmaProfil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null
        };
    }

    componentDidMount() {
        userService.getCurrentUser().then(user => this.setState({ user }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, user } = this.state;

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
                        <p>Bienvenue {user.roles[0]}</p>
                    }
                    {console.log(currentUser)}
                    {user && console.log(user.username)}
                    {user && console.log(user.roles[0])}
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