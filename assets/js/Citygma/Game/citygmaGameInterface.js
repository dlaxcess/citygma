import React, {Component, Fragment} from "react";
import { PositionTable } from "./geoloc/PositionTable";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { geolocated } from "react-geolocated";
import { Marker } from "react-map-gl";


class CitygmaGameInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: "80vw",
                height: "80vh",
                latitude: 48.1378304,
                longitude: -1.6875520000000002,
                zoom: 12
            }
        };

        this.handleViewportChange = this.handleViewportChange.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "80vh",
                width: "80vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12
            };
            this.setState({
                viewport: newViewport
            });
        })
    }


    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }


    render() {

        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
                    <div>
                        <ReactMapGL
                            {...this.state.viewport}
                            mapStyle="mapbox://styles/mapbox/outdoors-v11?optimize=true"
                            onViewportChange={this.handleViewportChange}
                            mapboxApiAccessToken="pk.eyJ1IjoiZGxheGNlc3MiLCJhIjoiY2szeGhmY3lhMTZiNjNqb3A3MzVkMGJoaCJ9.jifnf4oofKKVa0qLnxqA6A"
                        >
                            {this.state.viewport &&
                                <Marker
                                    latitude={this.state.viewport.latitude}
                                    longitude={this.state.viewport.longitude}
                                    anchor="bottom">
                                    <h3>OOO</h3>
                                </Marker>
                            }
                            <GeolocateControl
                                positionOptions={{ enableHighAccuracy: true }}
                                trackUserLocation={true}
                            />
                            <NavigationControl showCompass={true} showZoom={true} visualizePitch={true} />
                        </ReactMapGL>
                    </div>
                    {this.props.coords && this.props.coords.latitude}
                    <PositionTable />
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