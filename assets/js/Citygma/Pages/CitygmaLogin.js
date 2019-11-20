import React, {Component, Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";
import AuthService from "../../auth/components/AuthService";
import {Redirect} from "react-router";

import { authenticationService } from '../../auth/services/authenticationService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { history } from "../../auth/helpers/history";


export default class CitygmaLogin extends Component{
    //const { onUserCreateSubmit, onUserConnectSubmit } = props;
    constructor(props){
        super(props);

        this.state = {
            /*username: null,
            password: null,
            currentUser: null*/
        };

        /*this.handleUserCreateSubmit = this.handleUserCreateSubmit.bind(this);*/

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/profil');
        }
    }

    /*handleUserCreateSubmit(e) {
        e.preventDefault();

        const { onUserCreateSubmit } = this.props;
        onUserCreateSubmit(
            e.target.elements.namedItem('playerMail').value,
            e.target.elements.namedItem('playerPass').value
        );
    }*/

    render() {

        return (
            <Fragment>
                <div id="loginContainer">

                    <div id="loginTextContainer">
                        <img src={persoCitygma} alt=""/>
                        <div className="loginForm">

                            {/*<form onSubmit={this.handleUserCreateSubmit}>
                                <label htmlFor="playerMail">E-mail</label>
                                <input type="text" name="playerMail" id="playerMail"/>
                                <label htmlFor="playerPass">Mot de passe</label>
                                <input type="text" name="playerPass" id="playerPass"/>
                                <div id="loginSubmit">
                                    <input type="submit" id="loginSubmitButton" value="S'inscrire"/>
                                </div>
                            </form>*/}

                            <Formik
                                initialValues={{
                                    usernameCreate: '',
                                    passwordCreate: '',
                                    passwordCreateConfirm: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    usernameCreate: Yup.string().required('Username is required').email('Veuillez renseigner une adresse email valide'),
                                    passwordCreate: Yup.string().required('Password is required'),
                                    passwordCreateConfirm: Yup.string()
                                        .oneOf([Yup.ref('passwordCreate'), null], 'Les mots de pass doivent concorder')
                                })}
                                onSubmit={({ usernameCreate, passwordCreate, passwordCreateConfirm }, { setStatus, setSubmitting }) => {
                                    setStatus();
                                    authenticationService.signin(usernameCreate, passwordCreate)
                                        .then(
                                            data => {
                                                console.log(data);
                                                /*const { from } = this.props.location.state || { from: { pathname: "/profil" } };*/
                                                authenticationService.login(usernameCreate, passwordCreate)
                                                    .then(
                                                        user => {

                                                            /*const { from } = this.props.location.state || { from: { pathname: "/profil" } };*/
                                                            this.props.history.push("/profil");
                                                        },
                                                        error => {
                                                            setSubmitting(false);
                                                            setStatus(error);
                                                        }
                                                    );
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
                            }}>
                                {({ errors, status, touched, isSubmitting }) => (
                                    <Form>
                                        <div>
                                            <label htmlFor="usernameCreate">Username</label>
                                            <Field name="usernameCreate" type="text" className={'form-control' + (errors.usernameCreate && touched.usernameCreate ? ' is-invalid' : '')} placeholder="Email" />
                                            <ErrorMessage name="usernameCreate" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="passwordCreate">Password</label>
                                            <Field name="passwordCreate" type="password" className={'form-control' + (errors.passwordCreate && touched.passwordCreate ? ' is-invalid' : '')} />
                                            <ErrorMessage name="passwordCreate" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="passwordCreateConfirm">Password confirmation</label>
                                            <Field name="passwordCreateConfirm" type="password" className={'form-control' + (errors.passwordCreateConfirm && touched.passwordCreateConfirm ? ' is-invalid' : '')} />
                                            <ErrorMessage name="passwordCreateConfirm" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <button type="submit" disabled={isSubmitting}>S&rsquo;inscrire</button>
                                            {isSubmitting &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                                        {status &&
                                        <div>{status}</div>
                                        }
                                    </Form>
                                )}
                            </Formik>

                            <Formik
                                initialValues={{
                                    username: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    username: Yup.string().required('Username is required').email('Veuillez renseigner une adresse email valide'),
                                    password: Yup.string().required('Password is required')
                                })}
                                onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                                    setStatus();
                                    authenticationService.login(username, password)
                                        .then(
                                            user => {

                                                /*const { from } = this.props.location.state || { from: { pathname: "/profil" } };*/
                                                this.props.history.push("/profil");
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus(error);
                                            }
                                        );
                            }}>
                                {({ errors, status, touched, isSubmitting }) => (
                                    <Form>
                                        <div>
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} placeholder="Email" />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <button type="submit" disabled={isSubmitting}>Login</button>
                                            {isSubmitting &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                                        {status &&
                                        <div>{status}</div>
                                        }
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}