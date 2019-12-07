import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import { history } from "../../auth/helpers/history";
import {adventureService } from "../Game/services/adventureService";

import AdventureTemplate from "./ProfilComponents/AdventureTemplate";
import ProfilForm from "./ProfilComponents/ProfilForm";
import ProfilPasswordChange from "./ProfilComponents/ProfilPasswordChange";


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

        this.handleUserDataChange = this.handleUserDataChange.bind(this);
        this.handleUserPasswordChange = this.handleUserPasswordChange.bind(this);
    }

    componentDidMount() {
        userService.getCurrentUser().then(user => this.setState({ user }));
    }

    handleUserDataChange(username, email, password, setStatus, setSubmitting) {
        return (
            authenticationService.userDataChange(this.state.user.id, username, email)
                .then(
                    data => {
                        this.logout();
                        authenticationService.login(data.email, password).then(data => {history.push('/profil')});
                    },
                    error => {
                        setSubmitting(false);
                        setStatus(error);
                    }
                )
        );
    }

    handleUserPasswordChange(oldPass, newPass, confirmPass, setStatus, setSubmitting) {
        return (
            authenticationService.userPasswordChange(oldPass, newPass)
                .then(
                    data => {
                        this.logout();
                        authenticationService.login(data.email, newPass).then(data => {history.push('/profil')});
                    },
                    error => {
                        setSubmitting(false);
                        setStatus(error);
                    }
                )
        );
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, user, cityAdventures } = this.state;

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
                                <ProfilForm handleUserDataChange = {this.handleUserDataChange} user={user && user}/>
                            </div>

                            <div id="profilPasswordChange">
                                <ProfilPasswordChange handleUserPasswordChange = {this.handleUserPasswordChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}