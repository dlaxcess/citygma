import React from 'react';
import {usePosition} from 'use-position';
import ReactMapGL, {GeolocateControl, Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as geolib from 'geolib';

import logo from "../../../../images/logo-citygma.png";



export const GeolocateComponent = (props) => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});
    const { viewport, handleViewportChange, handleNearLocationDistance } = props;
    const distance = latitude && geolib.getDistance({latitude: latitude, longitude: longitude},{latitude: 48.111, longitude: -1.6794});



    if (distance < 40) {handleNearLocationDistance()}

    return (

        <code>

            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}<br/>

            distance from mairie: {distance}

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
                    /*anchor="bottom"*/>
                    <img width="30" height="auto" src={logo} style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}/>
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