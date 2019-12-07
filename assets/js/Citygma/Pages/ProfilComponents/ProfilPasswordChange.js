import React, {Fragment} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function ProfilPasswordChange(props) {

    const { handleUserPasswordChange } = props;


    return (
        <Fragment>
            <h3>Modifier mon mot de passe</h3>
            <Formik
                initialValues={{
                    oldPass: '',
                    newPass: '',
                    confirmPass: '',
                }}
                validationSchema={Yup.object().shape({
                    oldPass: Yup.string().required('Veuillez renseigner votre mot de passe actuel'),
                    newPass: Yup.string().required('Veuillez renseigner votre nouveau mot de passe'),
                    confirmPass: Yup.string().required('Veuillez confirmer votre nouveau mot de passe')
                        .oneOf([Yup.ref('newPass'), null], 'Les mots de pass doivent concorder')
                })}
                onSubmit={({oldPass, newPass, confirmPass}, {setStatus, setSubmitting}) => {
                    setStatus();

                    handleUserPasswordChange(oldPass, newPass, setStatus, setSubmitting);

                }}>
                {({errors, status, touched, isSubmitting}) => (
                    <Form>
                        <div>
                            <div id="profilUserPassChangeOld">
                                <label htmlFor="oldPass">Ancien mot de passe</label>
                                <Field name="oldPass" type="text"
                                       className={'form-control' + (errors.oldPass && touched.oldPass ? ' is-invalid' : '')}
                                       placeholder="Ancien mot de passe"/>
                                <ErrorMessage name="oldPass" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilUserPassChangeNew">
                                <label htmlFor="newPass">Nouveau mot de passe</label>
                                <Field name="newPass" type="text"
                                       className={'form-control' + (errors.newPass && touched.newPass ? ' is-invalid' : '')}
                                       placeholder="Nouveau mot de passe"/>
                                <ErrorMessage name="newPass" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilUserPassChangeConfirm">
                                <label htmlFor="confirmPass">Confirmer nouveau mot de passe</label>
                                <Field name="confirmPass" type="password"
                                       className={'form-control' + (errors.confirmPass && touched.confirmPass ? ' is-invalid' : '')}
                                       placeholder="Confirmer nouveau mot de passe"/>
                                <ErrorMessage name="confirmPass" component="div" className="invalid-feedback"/>
                            </div>
                            <div id="profilSubmitChangePass">
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