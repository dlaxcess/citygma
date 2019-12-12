import React, {Component, Fragment} from "react";

import { adventureService } from "./services/adventureService";

import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";

import { PositionTable } from "./geoloc/PositionTable";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { geolocated } from "react-geolocated";
import { Marker } from "react-map-gl";

import GoogleMapReact from 'google-map-react';

import logo  from "../../../images/logo-citygma.png";

import { usePosition } from 'use-position';


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
        const AnyReactComponent = ({ logo }) => <div><img src={logo} alt="" /></div>;



        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
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

                    {this.state.userAdvance &&
                    <div style={{height: '100vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyB_b0XlDR25dl5dbC92N5SiFYjlmUOvE34'}}
                            defaultCenter={this.state.center}
                            defaultZoom={this.state.zoom}
                        >
                            <AnyReactComponent
                                lat={48.1378304}
                                lng={-1.6875520000000002}
                                logo={logo}
                                text="My Marker"
                            />
                        </GoogleMapReact>
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
                    <PositionTable viewport={this.state.viewport} handleViewportChange={this.handleViewportChange} />
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