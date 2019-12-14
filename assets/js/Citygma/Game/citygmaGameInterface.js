import React, {Component, Fragment} from "react";
import { adventureService } from "./services/adventureService";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
import LocationCompass from "./geoloc/LocationCompass";



export default class CitygmaGameInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // react-map-gl
            viewport: {
                width: "80vw",
                height: "80vh",
                latitude: 48.1378304,
                longitude: -1.6875520000000002,
                zoom: 16
            },
            // Game Data
            userAdvance: null,
            adventure: null,
            videoEnded: false
        };


        this.handleViewportChange = this.handleViewportChange.bind(this);
        this.handleNearLocationDistance = this.handleNearLocationDistance.bind(this);
        this.handleBackToGameInterface = this.handleBackToGameInterface.bind(this);
        this.onVideoEnded = this.onVideoEnded.bind(this);
    }


    componentDidMount() {
        // Get current adventure
        const {adventureId} = this.props.location.state;

        adventureService.getCityAdventure(adventureId)
            .then(adventure => {
                this.setState({adventure: adventure});
            });

        // Geolocation react-map-gl initialize
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

        // Compass Bearing
        LocationCompass();

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

    handleNearLocationDistance() {

    }


    render() {

        console.log(this.state.adventure);

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

                    <GeolocateComponent
                        viewport={this.state.viewport}
                        handleViewportChange={this.handleViewportChange}
                        handleNearLocationDistance={this.handleNearLocationDistance}
                    />
                </div>
            </Fragment>
        );
    }
}