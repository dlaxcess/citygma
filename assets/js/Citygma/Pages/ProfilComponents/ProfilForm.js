import React, {Fragment} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function ProfilForm(props) {

    const { handleUserDataChange, user } = props;


    return (
        <Fragment>
            <h3>Modifier mes données personnelles</h3>
            <p>(Pour modifier vos données vous devez renseigner votre mot de passe)</p>
            <Formik
                initialValues={{
                    username: user ? user.username : '',
                    email: user ? user.email : '',
                    password: user ? user.password : '',
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string(),
                    email: Yup.string().email('Veuillez renseigner une adresse email valide'),
                    password: Yup.string().required('Veuillez Renseigner votre mot de passe pour modifier vos données personnelles')
                })}
                onSubmit={({username, email, password}, {setStatus, setSubmitting}) => {
                    setStatus();

                    handleUserDataChange(username, email, password, setStatus, setSubmitting);

                }}>
                {({errors, status, touched, isSubmitting, username, email, password}) => (
                    <Form>
                        <div>
                            <div id="profilUsernameForm">
                                <label htmlFor="username">Nom</label>
                                <Field name="username" type="text"
                                       className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                                       placeholder={user && user.username}/>
                                <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilEmailForm">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text"
                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                       placeholder={user && user.email}/>
                                <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilPassForm">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password"
                                       className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                       placeholder={user && user.password}/>
                                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilSubmitForm">
                                <button className="marronButton" type="submit" disabled={isSubmitting}>Modifier</button>
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
        </Fragment>
    );
}