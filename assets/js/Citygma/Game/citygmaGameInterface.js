import React, {Component, Fragment} from "react";

import { adventureService } from "./services/adventureService";

import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";

import { PositionTable } from "./geoloc/PositionTable";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { geolocated } from "react-geolocated";
import { Marker } from "react-map-gl";


import logo  from "../../../images/logo-citygma.png";



class CitygmaGameInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: "80vw",
                height: "80vh",
                latitude: 48.1378304,
                longitude: -1.6875520000000002,
                zoom: 16
            },
            center: {
                lat: 48.1378304,
                lng: -1.6875520000000002
            },
            zoom: 16,
            userAdvance: null,
            adventure: null,
            videoEnded: false
        };

        this.handleViewportChange = this.handleViewportChange.bind(this);
        this.handleBackToGameInterface = this.handleBackToGameInterface.bind(this);
        this.onVideoEnded = this.onVideoEnded.bind(this);


    }

    componentDidMount() {
        const { adventureId } = this.props.location.state;

        // Get current adventure
        adventureService.getCityAdventure(adventureId)
            .then(adventure => {

                this.setState({adventure});

            });

        // Geolocation
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "80vh",
                width: "80vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 16
            };
            this.setState({
                viewport: newViewport
            });
        });

        // test boussole
        /*const arrow = document.querySelector('#arrow>img');

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        const options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };

        navigator.geolocation.watchPosition((data) => {
            console.log(data);
            arrow.style.transform = `rotate(${data.coords.heading}deg)`;
            document.getElementById("direction").innerHTML = data.coords.heading;
        }, error, options);*/

        // Boussole 2
        if (window.DeviceOrientationEvent) {
            document.getElementById("notice").innerHTML = "super ça marche.";
            window.addEventListener('deviceorientation', function(eventData) {
                // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
                var tiltLR = eventData.gamma;

                // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
                var tiltFB = eventData.beta;

                // alpha: The direction the compass of the device aims to in degrees.
                var dir = eventData.alpha;

                navigator.geolocation.getCurrentPosition(position => {
                    const bearedDir = dir + getBearing(position.coords.latitude, position.coords.longitude, 48.111, -1.6794);

                    // Call the function to use the data on the page.
                    deviceOrientationHandler(tiltLR, tiltFB, bearedDir);
                });

            }, false);
        } else {
            document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund.";
        }

        function deviceOrientationHandler(tiltLR, tiltFB, dir) {
            document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
            document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
            document.getElementById("direction").innerHTML = Math.ceil(dir);

            // Rotate the disc of the compass.
            // Laat de kompas schijf draaien.
            var compassDisc = document.querySelector('#arrow>img');
            compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
            compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
            compassDisc.style.transform = "rotate("+ dir +"deg)";
        }

        function toRadians(degrees) {
            const pi = Math.PI;
            return degrees * (pi/180);
        }

        function toDegrees(radians) {
            const pi = Math.PI;
            return radians * (180/pi);
        }

        function getBearing(lat1, long1, lat2, long2) {
            const lat1Rad = toRadians(lat1);
            const lat2Rad = toRadians(lat2);
            const deltaLng = toRadians(long2 - long1);

            const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLng);
            const y = Math.sin(deltaLng) * Math.cos(lat2Rad);
            const bearingRad = Math.atan2(y, x);

            const bearing = toDegrees(bearingRad);

            return bearing;
        }

        console.log(document.querySelector('.mapboxgl-ctrl-geolocate'));
    }


    handleBackToGameInterface() {
        this.setState({userAdvance: 1});
    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }


    render() {



        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
                    <div id="arrow"><img src={logo}/></div>
                    <div id="notice"></div>
                    <div id="tiltLR"></div>
                    <div id="tiltFB"></div>
                    <div id="direction"></div>

                    <button className="marronButton" onClick={() => {this.setState({userAdvance: null})}}>Revoir</button>
                    { this.state.videoEnded && "Video Finie" }

                    { this.state.userAdvance && this.state.adventure &&
                        <div>
                            <VideoPlayerComponent
                                videoUrl={this.state.adventure.videoAdventureIntroFilename}
                                handleBackToGameInterface={this.handleBackToGameInterface}
                                onVideoEnded={this.onVideoEnded}
                            />
                        </div>
                    }


                    { this.state.userAdvance &&
                        <div>
                            <ReactMapGL
                                {...this.state.viewport}
                                mapStyle="mapbox://styles/mapbox/outdoors-v11?optimize=true"
                                onViewportChange={this.handleViewportChange}
                                mapboxApiAccessToken="pk.eyJ1IjoiZGxheGNlc3MiLCJhIjoiY2szeGhmY3lhMTZiNjNqb3A3MzVkMGJoaCJ9.jifnf4oofKKVa0qLnxqA6A"
                                trackUserLocation={true}
                                showUserLocation={true}
                            >
                                {this.state.viewport &&
                                <Marker
                                    latitude={this.props.coords ? this.props.coords.latitude : this.state.viewport.latitude}
                                    longitude={this.props.coords ? this.props.coords.longitude : this.state.viewport.longitude}
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
                        </div>
                    }
                    {this.props.coords && this.props.coords.latitude}
                    <PositionTable viewport={this.state.viewport} handleViewportChange={this.handleViewportChange} center={this.state.center} zoom={this.state.zoom} />
                </div>
            </Fragment>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(CitygmaGameInterface);