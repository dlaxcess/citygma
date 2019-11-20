//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getCurrentUser
};

function getCurrentUser() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("82.165.120.148:80/api/user", requestOptions).then(handleResponse);
}