import { handleResponse } from '../../../auth/helpers/handle-response';

export const mailerService = {
    sendMail
};

function sendMail(email, subject, message) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message })
    };
    return fetch("/citygma_contact", requestOptions).then(handleResponse);
}