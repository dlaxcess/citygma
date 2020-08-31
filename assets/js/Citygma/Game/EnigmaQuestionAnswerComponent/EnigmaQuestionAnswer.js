import React, {Fragment, useState, useEffect} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

import { adventureService } from "../services/adventureService";
import { uploadsDir} from "../../ConstData/uploadsDir";


export default function EnigmaQuestionAnswer(props) {

    const { showCurrentEnigma, onLoupeClick, enigmaId, adventureId, enigmaQuestionPicture, enigmaQuestionText, enigmaQuestionTime, handleBackToGameInterface/*handleEnigmaGoodAnswer*/ } = props;

    const enigmaQuestionTimeNumber = parseInt(enigmaQuestionTime, 10);

    const [count, setCount] = useState(enigmaQuestionTimeNumber);

    if (enigmaQuestionTimeNumber !== 0) {
        useEffect(() => {
            const timeout = setTimeout(() => {
                handleBackToGameInterface();
            }, 1000*enigmaQuestionTimeNumber);

            const interval = setInterval(() => {setCount(c => c -1)}, 1000);

            return () => clearTimeout(timeout);
        },[]);
    }


    return (
        <Fragment>

        { showCurrentEnigma ?
            <section key={enigmaId} id="enigmaSection">

                { enigmaQuestionPicture && <img src={`${uploadsDir.getUploadsDir()}${enigmaQuestionPicture}`}/> }
                <h2>Enigme</h2><br/>
                {/* Conversion String enigme en html */}
                <div dangerouslySetInnerHTML={{__html: enigmaQuestionText}} />
                <p>{enigmaQuestionTimeNumber !== 0 && 'Temps restant : ' + count + 's'}</p>

                <Formik
                    initialValues={{
                        enigmaAnswer: '',
                    }}
                    validationSchema={Yup.object().shape({
                        enigmaAnswer: Yup.string().required('Veuillez Renseigner une réponse à l\'énigme')
                    })}
                    onSubmit={({enigmaAnswer}, {setStatus, setSubmitting}) => {
                        setStatus();
                        document.activeElement.blur();
                        /*document.getElementsByClassName('form-control').blur();*/
                        adventureService.answerEnigma(enigmaId, adventureId, enigmaAnswer)
                            .then(
                                data => {
                                    /*handleEnigmaGoodAnswer*/handleBackToGameInterface(true, enigmaId);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}>
                    {({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <div>
                                <div id="enigmaAnswerForm">
                                    <label htmlFor="enigmaAnswer">Réponse à l&lsquo;énigme</label>
                                    <Field name="enigmaAnswer" type="text"
                                           className={'form-control' + (errors.enigmaAnswer && touched.enigmaAnswer ? ' is-invalid' : '')}
                                           placeholder="Réponse"/>
                                    <ErrorMessage name="enigmaAnswer" component="div" className="invalid-feedback"/>
                                </div>
                                <div id="enigmaAnswerSubmitForm">
                                    <button className="marronButton" type="submit"
                                            disabled={isSubmitting}>Répondre
                                    </button>
                                    <button className="marronButton" onClick={handleBackToGameInterface}>Passer, c'est trop dur... >></button>
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
            </section>
            :
            <div id="waitForEnigma">
                <h2>... mmmhh ...</h2>
                <p>Il semble que vous soyez encore loin du prochain lieu... rapprochez vous en pour activer la prochaine énigme.</p>
            </div>
        }
        </Fragment>
    );
}