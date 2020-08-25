import React from 'react';
import {usePosition} from 'use-position';
import ReactMapGL, {GeolocateControl, Marker} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as geolib from 'geolib';

import {uploadsDir} from "../../ConstData/uploadsDir";

import logo from "../../../../images/logo-citygma.png";


export const GeolocateComponent = (props) => {

    function toRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi/180);
    }

    function toDegrees(radians) {
        const pi = Math.PI;
        return radians * (180/pi);
    }

    function wrap360(degrees) {
        if (0<=degrees && degrees<360) return degrees; // avoid rounding due to arithmetic ops if within range
        return (degrees%360+360) % 360; // sawtooth wave p:360, a:360
    }

    function getBearing(lat1, long1, lat2, long2) {
        let lat1Rad = toRadians(lat1);
        let lat2Rad = toRadians(lat2);
        let deltaLng = toRadians(long2 - long1);

        let x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLng);
        let y = Math.sin(deltaLng) * Math.cos(lat2Rad);
        let bearingRad = Math.atan2(y, x);

        return /*this.wrap360(*/toDegrees(bearingRad)/*)*/;
    }

    const { latitude, longitude, timestamp, accuracy, error } = usePosition(false, {enableHighAccuracy: true});
    const { viewport, handleViewportChange, handleNearLocationDistance, destinationLat, destinationLong, destinationPrecision, currentEnigmaActiveCompass, handleReCenter, pictoMarker } = props;
    let distance = latitude && geolib.getDistance({latitude: latitude, longitude: longitude},{latitude: destinationLat, longitude: destinationLong});

    let bearing = getBearing(latitude, longitude, destinationLat, destinationLong);


    let positionMarker = document.querySelector('#positionMarker');
    if (positionMarker) {
        positionMarker.style.webkitTransform = "rotate("+ bearing +"deg)";
        positionMarker.style.MozTransform = "rotate("+ bearing +"deg)";
        positionMarker.style.transform = "rotate("+ bearing +"deg)";
    }


    if (distance < destinationPrecision) {handleNearLocationDistance()}

    return (

        <div id="geolocateComponent">
            <div id="test">
                latitude: {latitude}<br/>
                longitude: {longitude}<br/>
                timestamp: {timestamp}<br/>
                accuracy: {accuracy && `${accuracy}m`}<br/>
                error: {error}<br/>
                dist declanchmt: {destinationPrecision}<br/>
            </div>

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
                        <img id="positionMarker" width="30" height="auto" src={`${uploadsDir.getUploadsDir()}${pictoMarker}`} style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}/>
                    :
                        <img width="30" height="auto" src={logo} style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}/>
                        /*<h2 style={{marginLeft: '-0.7rem', marginTop: '-0.4rem'}}>O</h2>*/
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
}