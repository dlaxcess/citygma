//import config from 'config';
import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getCurrentUser,
    setCurrentUserAdvance,
    getCurrentUserAdvance,
    resetUserAdvance
};

function getCurrentUser() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("/api/user", requestOptions).then(handleResponse);
}

function setCurrentUserAdvance(userId, adventureId, userAdvance) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, adventureId, userAdvance })
    };
    return fetch("/api/setUserAdvance", requestOptions).then(handleResponse);
}

function getCurrentUserAdvance(userId, adventureId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, adventureId })
    };
    return fetch("/api/getUserAdvance", requestOptions).then(handleResponse);
}

function resetUserAdvance(userId, adventureId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ userId, adventureId })
    };
    return fetch("/api/resetUserAdvance", requestOptions).then(handleResponse);
}
