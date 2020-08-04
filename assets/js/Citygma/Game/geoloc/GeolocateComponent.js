import React from 'react';
import {usePosition} from 'use-position';
import ReactMapGL, {GeolocateControl, Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as geolib from 'geolib';

import logo from "../../../../images/logo-citygma.png";



export const GeolocateComponent = (props) => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});
    const { viewport, handleViewportChange, handleNearLocationDistance, destinationLat, destinationLong, currentEnigmaActiveCompass, handleReCenter } = props;
    let distance = latitude && geolib.getDistance({latitude: latitude, longitude: longitude},{latitude: destinationLat, longitude: destinationLong});



    if (distance < 60) {handleNearLocationDistance()}

    return (

        <div id="geolocateComponent">
            {/*
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}<br/>
            */}
            <h3 id="distanceComponent">{distance} m</h3>
            <button id="recenterButton" className="marronButton" onClick={handleReCenter}>Recentrer</button>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/outdoors-v11?optimize=true"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken="pk.eyJ1IjoiZGxheGNlc3MiLCJhIjoiY2szeGhmY3lhMTZiNjNqb3A3MzVkMGJoaCJ9.jifnf4oofKKVa0qLnxqA6A"
                height="100vh"
                width="100vw"
            >
                {viewport &&
                <Marker
                    latitude={latitude ? latitude : viewport.latitude}
                    longitude={longitude ? longitude : viewport.longitude}
                    /*anchor="bottom"*/>
                    { currentEnigmaActiveCompass ?
                        <img id="positionMarker" width="30" height="auto" src={logo} style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}/>
                    :
                        <h2 style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}>O</h2>
                    }
                </Marker>
                }
                {/*<GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    showUserLocation={true}
                />*/}


            </ReactMapGL>

        </div>


    );
};