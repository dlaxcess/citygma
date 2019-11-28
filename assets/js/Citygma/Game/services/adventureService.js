import { authHeader } from '../../../auth/helpers/auth-header';
import { handleResponse } from '../../../auth/helpers/handle-response';

export const adventureService = {
    getCityAdventures
};

function getCityAdventures() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch("/api/CityAdventures", requestOptions).then(handleResponse);
}