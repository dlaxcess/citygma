import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authenticationService';

export const PrivateRoute = ({ component: Component, data, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} {...data}/>
    }} />
)