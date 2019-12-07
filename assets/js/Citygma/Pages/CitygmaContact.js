import React, {Component, Fragment} from "react";
import { authenticationService } from '../../auth/services/authenticationService';
import {userService} from "../../auth/services/userService";
import {mailerService} from "./services/mailerService";
import { history } from "../../auth/helpers/history";

import AdventureTemplate from "./ProfilComponents/AdventureTemplate";
import ProfilForm from "./ProfilComponents/ProfilForm";
import ProfilPasswordChange from "./ProfilComponents/ProfilPasswordChange";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";


export default class CitygmaContact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null,
            confirmMessage: null
        };
    }

    componentDidMount() {
        if (this.state.currentUser) {
            userService.getCurrentUser().then(user => this.setState({ user }));
        }
    }


    render() {
        const { user, confirmMessage } = this.state;

        return (
            <Fragment>
                <div id="contactContainer">
                    <div id="contactImmeubleLeft"></div>
                    <div id="contactContainerScroll">
                        <div id="contactTextContainer">
                            <h2>Formulaire de contact</h2>
                            <p>Pour nous contacter veuiller renseigner ce formulaire et cliquer sur &quot;Envoyer&quot;</p>
                            {confirmMessage && confirmMessage}
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    email: this.state.user ? this.state.user.email : '',
                                    subject: '',
                                    message: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string().email('Veuillez renseigner une adresse email valide'),
                                    subject: Yup.string().required('Veuillez renseigner le sujet'),
                                    message: Yup.string().required('Veuillez écrire un message')
                                })}
                                onSubmit={({email, subject, message}, {setStatus, setSubmitting, resetForm}) => {
                                    setStatus();

                                    mailerService.sendMail(email, subject, message)
                                        .then(data => {
                                            this.setState({ confirmMessage: data.message });
                                            resetForm();
                                        });

                                }}>
                                {({errors, status, touched, isSubmitting, email}) => (
                                    <Form>
                                        <div>
                                            <div id="contactEmail">
                                                <label htmlFor="email">Votre Email</label>
                                                {this.state.user ?
                                                    <Fragment>
                                                        <Field name="email" type="text"
                                                               className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                                                />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                                    </Fragment>
                                                :
                                                    <Fragment>
                                                        <Field name="email" type="text"
                                                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                                            placeholder="email" />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                                    </Fragment>
                                                }
                                            </div>
                                            <div id="contactSubject">
                                                <label htmlFor="subject">Sujet</label>
                                                <Field name="subject" type="text"
                                                       className={'form-control' + (errors.subject && touched.subject ? ' is-invalid' : '')}
                                                       placeholder="Sujet"/>
                                                <ErrorMessage name="subject" component="div" className="invalid-feedback"/>
                                            </div>
                                            <div id="contactMessage">
                                                <label htmlFor="message">Votre message</label>
                                                <Field name="message" component="textarea"
                                                       className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')}
                                                       placeholder="Entrez votre message ici"/>
                                                <ErrorMessage name="message" component="div" className="invalid-feedback"/>
                                            </div>
                                            <div id="contactSubmitForm">
                                                <button className="marronButton" type="submit" disabled={isSubmitting}>Envoyer</button>
                                                {isSubmitting &&
                                                <img
                                                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                                }
                                            </div>
                                        </div>
                                        {status &&
                                        <div>{status}</div>
                                        }
                                    </Form>
                                )}
                            </Formik>







                            {/*<div id="profilHeader">
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
                            </div>*/}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}