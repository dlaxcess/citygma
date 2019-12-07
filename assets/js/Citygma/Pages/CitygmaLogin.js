import React, {Component, Fragment} from "react";
import persoCitygma from "../../../images/silhouette-logo.png";

import { authenticationService } from '../../auth/services/authenticationService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { history } from "../../auth/helpers/history";
import {userService} from "../../auth/services/userService";


export default class CitygmaLogin extends Component{
    //const { onUserCreateSubmit, onUserConnectSubmit } = props;
    constructor(props){
        super(props);

        // redirect to profil if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/profil');
        }
    }

    render() {

        return (
            <Fragment>
                <div id="loginContainer">

                    <div id="loginTextContainer">
                        <img src={persoCitygma} alt=""/>
                        <div className="loginForm">

                            <h2>M&lsquo;inscrire</h2>
                            <Formik
                                initialValues={{
                                    usernameCreate: '',
                                    emailCreate: '',
                                    passwordCreate: '',
                                    passwordCreateConfirm: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    usernameCreate: Yup.string().required('Username is required'),
                                    emailCreate: Yup.string().required('Username is required').email('Veuillez renseigner une adresse email valide'),
                                    passwordCreate: Yup.string().required('Password is required').min(6, 'veuillez entrer au moins 6 caractères'),
                                    passwordCreateConfirm: Yup.string()
                                        .oneOf([Yup.ref('passwordCreate'), null], 'Les mots de pass doivent concorder')
                                })}
                                onSubmit={({ usernameCreate, emailCreate, passwordCreate, passwordCreateConfirm }, { setStatus, setSubmitting }) => {
                                    setStatus();
                                    authenticationService.signin(usernameCreate, emailCreate, passwordCreate)
                                        .then(
                                            data => {
                                                console.log(data);
                                                /*const { from } = this.props.location.state || { from: { pathname: "/profil" } };*/
                                                authenticationService.login(emailCreate, passwordCreate)
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
                                            <label htmlFor="usernameCreate">Nom</label>
                                            <Field name="usernameCreate" type="text" className={'form-control' + (errors.usernameCreate && touched.usernameCreate ? ' is-invalid' : '')} placeholder="Pseudo" />
                                            <ErrorMessage name="usernameCreate" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="emailCreate">Email</label>
                                            <Field name="emailCreate" type="text" className={'form-control' + (errors.emailCreate && touched.emailCreate ? ' is-invalid' : '')} placeholder="Email" />
                                            <ErrorMessage name="usernameCreate" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="passwordCreate">Mot de passe</label>
                                            <Field name="passwordCreate" type="password" className={'form-control' + (errors.passwordCreate && touched.passwordCreate ? ' is-invalid' : '')} placeholder="Mot de passe" />
                                            <ErrorMessage name="passwordCreate" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="passwordCreateConfirm">Confirmation Mot de passe</label>
                                            <Field name="passwordCreateConfirm" type="password" className={'form-control' + (errors.passwordCreateConfirm && touched.passwordCreateConfirm ? ' is-invalid' : '')} placeholder="Confirmation mot de passe" />
                                            <ErrorMessage name="passwordCreateConfirm" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <button className="marronButton" type="submit" disabled={isSubmitting}>S&rsquo;inscrire</button>
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

                            <h2>Me connecter</h2>
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
                                            <label htmlFor="username">Email</label>
                                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} placeholder="Email" />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Mot de passe</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} placeholder="Mot de passe" />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div>
                                            <button className="marronButton" type="submit" disabled={isSubmitting}>Se connecter</button>
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