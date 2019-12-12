import { authHeader } from '../../../auth/helpers/auth-header';
import { handleResponse } from '../../../auth/helpers/handle-response';

export const adventureService = {
    getCityAdventures,
    getCityAdventure
};

function getCityAdventures() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("/api/CityAdventures", requestOptions).then(handleResponse);
}

function getCityAdventure(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ id })
    };

    return fetch('/api/CityAdventure', requestOptions)
        .then(handleResponse)
        .then(data => {

            return data;
        });
}