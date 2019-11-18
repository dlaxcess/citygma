import React, {Component, Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";
import AuthService from "../../auth/components/AuthService";
import {Redirect} from "react-router";

export default class CitygmaLogin extends Component{
    //const { onUserCreateSubmit, onUserConnectSubmit } = props;
    constructor(props){
        super(props);

        this.state = {
            username: null,
            password: null
        };

        this.handleUserCreateSubmit = this.handleUserCreateSubmit.bind(this);
        this.handleUserConnectSubmit = this.handleUserConnectSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        //this.componentWillMount = this.componentWillMount.bind(this);
        this.handleFormLoginSubmit = this.handleFormLoginSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.Auth = new AuthService();
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/profil');
    }

    handleFormLoginSubmit(e){
        e.preventDefault();
        console.log(this.state.username);

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                //<Redirect to='/profil' />
                this.props.history.replace('/profil');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handleUserCreateSubmit(e) {
        e.preventDefault();

        const { onUserCreateSubmit } = this.props;
        onUserCreateSubmit(
            e.target.elements.namedItem('playerMail').value,
            e.target.elements.namedItem('playerPass').value
        );
    }

    handleUserConnectSubmit(e) {
        e.preventDefault();

        const { onUserConnectSubmit } = this.props;
        onUserConnectSubmit(
            e.target.elements.namedItem('connectPlayerMail').value,
            e.target.elements.namedItem('connectPlayerPass').value
        );
    }

    handleLogout(){
        this.Auth.logout();
        this.props.history.replace('/login');
    }

    render() {
        //console.log(window.location.pathname);
        console.log(this.props);
        return (
            <Fragment>
                <div id="loginContainer">

                    <div id="loginTextContainer">
                        <img src={persoCitygma} alt=""/>
                        <div className="loginForm">
                            <button type="button" onClick={this.handleLogout}>Logout</button>
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   fetch('/api/logout');

                                   document.location.href = "/login";
                               }}
                            >logout</a>
                            <form onSubmit={this.handleUserCreateSubmit}>
                                <label htmlFor="playerMail">E-mail</label>
                                <input type="text" name="playerMail" id="playerMail"/>
                                <label htmlFor="playerPass">Mot de passe</label>
                                <input type="text" name="playerPass" id="playerPass"/>
                                <div id="loginSubmit">
                                    <input type="submit" id="loginSubmitButton" value="S'inscrire"/>
                                </div>
                            </form>

                            <form onSubmit={this.handleFormLoginSubmit}>
                                <label htmlFor="connectPlayerMail">E-mail</label>
                                <input
                                    type="text" name="username" id="connectPlayerMail"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="connectPlayerPass">Mot de passe</label>
                                <input
                                    type="text" name="password" id="connectPlayerPass"
                                    onChange={this.handleChange}
                                />
                                <div id="loginSubmit">
                                    <input type="submit" id="loginSubmitButton" value="Connexion"/>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}