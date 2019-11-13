import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import CitygmaHeader from "../Header/CitygmaHeader";
import CitygmaAppContainer from "./CitygmaAppContainer";
import CitygmaLogin from "./Pages/CitygmaLogin";
import CitygmaAbout from "./Pages/CitygmaAbout";
import CitygmaMentions from "./Pages/CitygmaMentions";
import CitygmaProfil from "./Pages/CitygmaProfil";
import Cookies from "react-cookie";

export default class CitygmaApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            htmlElementClicked : null,
        };
    }

    handleUserCreateSubmit(playerMail, playerPassword) {
        console.log(playerMail, playerPassword);
        let value = {
            "username" : playerMail,
            "password" : playerPassword
        };

        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })

    }

    handleUserConnectSubmit(connectPlayerMail, connectPlayerPassword) {
        let user = {
            "username" : connectPlayerMail,
            "password" : connectPlayerPassword
        };

        fetch('/api/login_check', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data.token);
            })
    }

    render() {
        const { htmlElementClicked } = this.state;
        console.log(window.location.pathname);

        return (
            <Fragment>
                <CitygmaHeader/>
                <Switch>
                    <Route exact path="/"><CitygmaAppContainer/></Route>
                    <Route path="/login">
                        <CitygmaLogin
                            onUserCreateSubmit={this.handleUserCreateSubmit}
                            onUserConnectSubmit={this.handleUserConnectSubmit}
                        />
                    </Route>
                    <Route path="/about" component={CitygmaAbout} />
                    <Route path="/Mentions" component={CitygmaMentions} />
                    <Route path="/profil" component={CitygmaProfil} />
                </Switch>
            </Fragment>
        )
    }
}