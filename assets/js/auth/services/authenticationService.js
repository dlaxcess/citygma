import { BehaviorSubject } from 'rxjs';

//import config from 'config';
import { handleResponse } from '../helpers/handle-response';
import {authHeader} from "../helpers/auth-header";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    signin,
    login,
    logout,
    userDataChange,
    userPasswordChange,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function signin(username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    };

    return fetch('/api/register', requestOptions)
        .then(handleResponse)
        .then(data => {

            return data;
        });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("/api/login_check", requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function userDataChange(id, username, email) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ id, username, email })
    };

    return fetch('/api/userDataChange', requestOptions)
        .then(handleResponse)
        .then(data => {

            return data;
        });
}

function userPasswordChange(oldPass, newPass) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ oldPass, newPass })
    };

    return fetch('/api/userPasswordChange', requestOptions)
        .then(handleResponse)
        .then(data => {

            return data;
        });
}