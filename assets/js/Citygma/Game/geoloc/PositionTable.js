import React from 'react';
import {usePosition} from './usePosition';
import ReactMapGL, {GeolocateControl, Marker} from "react-map-gl";
import logo from "../../../../images/logo-citygma.png";
import GoogleMapReact from "google-map-react";
//import { getDistance } from 'geolib';
import * as geolib from 'geolib';


const AnyReactComponent = ({ logo }) => <div><img src={logo} alt="" /></div>;


export const PositionTable = (props) => {
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});
    const { viewport, handleViewportChange, center } = props;
    const distance = latitude && geolib.getDistance({latitude: latitude, longitude: longitude},{latitude: 48.111, longitude: -1.6794}).toString();
    //console.log(geolib.getDistance({latitude: 48.1378304, longitude: -1.6875520000000002},{latitude: 48.111, longitude: -1.6794}));

    const { mapOptions } = {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };


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

            <div style={{height: '100vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB_b0XlDR25dl5dbC92N5SiFYjlmUOvE34" }}
                    defaultCenter={props.center}
                    defaultZoom={props.zoom}
                    options={mapOptions}
                >
                    <AnyReactComponent
                        lat={latitude ? latitude : 48.1378304}
                        lng={longitude ? longitude : -1.6875520000000002}
                        logo={logo}
                    />
                </GoogleMapReact>
            </div>
        </code>


    );
};