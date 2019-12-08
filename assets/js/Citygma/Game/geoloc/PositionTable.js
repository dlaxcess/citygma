import React from 'react';
import {usePosition} from './usePosition';

export const PositionTable = () => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});

    return (
        <code>
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}
        </code>
    );
};