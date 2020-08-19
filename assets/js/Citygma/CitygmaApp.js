import React, {Component, Fragment} from "react";
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import CitygmaHeader from "../Header/CitygmaHeader";
import CitygmaAppContainer from "./CitygmaAppContainer";
import CitygmaLogin from "./Pages/CitygmaLogin";
import CitygmaAbout from "./Pages/CitygmaAbout";
import CitygmaMentions from "./Pages/CitygmaMentions";
import CitygmaProfil from "./Pages/CitygmaProfil";
import CitygmaContact from "./Pages/CitygmaContact";
import CitygmaGameInterface from "./Game/citygmaGameInterface";

import { PrivateRoute } from "../auth/components/PrivateRoute";
import { authenticationService } from '../auth/services/authenticationService';
import { history } from "../auth/helpers/history";

import NoSleep from 'nosleep.js';

export default class CitygmaApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCookiesAcceptation: true,
            htmlElementClicked : null,
            currentUser: null,
            showHeader: true,
        };

        this.logout = this.logout.bind(this);
        this.toggleHeader = this.toggleHeader.bind(this);
        this.handleCookieAccptationClick = this.handleCookieAccptationClick.bind(this);
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        this.props.history.location.pathname !== "/Jeu" ? this.setState({showHeader: true}) : this.setState({showHeader: false});

     }

    componentWillUnmount() {
        this.state.noSleep.disable();
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    toggleHeader(bool) {
        this.setState({showHeader: bool});
    }

    handleCookieAccptationClick() {
        this.setState({showCookiesAcceptation: false})
    }

    render() {
        const { htmlElementClicked } = this.state;
        const { currentUser } = this.state;

        console.log(this.props.history.location.pathname);

        return (

            <Fragment>
                { this.state.showHeader &&
                <CitygmaHeader
                    currentUser={currentUser}
                    onLogoutClick={this.logout}
                />}

                { this.state.showCookiesAcceptation &&
                <div id="cookiesAcceptation">
                    <p>Ce site utilise des cookies uniquement liés à sont fonctionnement</p>
                    <button className="marronButton" onClick={this.handleCookieAccptationClick}>Ok</button> <NavLink to="/Mentions"  onClick={this.handleCookieAccptationClick}><button className="marronButton">Mentions légales</button></NavLink>
                </div>
                }

                <Switch>
                    <Route exact path="/"><CitygmaAppContainer/></Route>
                    <Route path="/login">
                        <CitygmaLogin
                            history={this.props.history}
                            onUserCreateSubmit={this.handleUserCreateSubmit}
                            onUserConnectSubmit={this.handleUserConnectSubmit}
                        />
                    </Route>
                    <Route path="/about" component={CitygmaAbout} />
                    <Route path="/contact" component={CitygmaContact} />
                    <Route path="/Mentions" component={CitygmaMentions} />
                    <PrivateRoute exact path="/profil" component={CitygmaProfil} />
                    <PrivateRoute path="/jeu" component={CitygmaGameInterface} data={{currentUser: currentUser, onLogoutClick: this.logout, toggleHeader: this.toggleHeader}} />
                </Switch>
            </Fragment>
        )
    }
}