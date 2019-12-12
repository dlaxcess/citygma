import React from 'react';
import {usePosition} from './usePosition';
import ReactMapGL, {GeolocateControl, Marker} from "react-map-gl";
import logo from "../../../../images/logo-citygma.png";


export const PositionTable = (props) => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});
    const { viewport, handleViewportChange } = props;

    return (

        <code>
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}

            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/outdoors-v11?optimize=true"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken="pk.eyJ1IjoiZGxheGNlc3MiLCJhIjoiY2szeGhmY3lhMTZiNjNqb3A3MzVkMGJoaCJ9.jifnf4oofKKVa0qLnxqA6A"
            >
                {viewport &&
                <Marker
                    latitude={latitude ? latitude : viewport.latitude}
                    longitude={longitude ? longitude : viewport.longitude}
                    draggable={true}
                    captureDrag={false}
                    anchor="bottom">
                    <img width="40" height="auto" src={logo}/>
                </Marker>
                }
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    showUserLocation={true}
                />

            </ReactMapGL>
        </code>


    );
};