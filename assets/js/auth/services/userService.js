//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getCurrentUser
};

function getCurrentUser() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("http://www.citygma.com/api/user", requestOptions).then(handleResponse);
}