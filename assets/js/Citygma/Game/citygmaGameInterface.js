import React, {Component, Fragment} from "react";
import { adventureService } from "./services/adventureService";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
import LocationCompass from "./geoloc/LocationCompass";
import logo from "../../../images/logo-citygma.png";




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
            userAdvance: 0,
            adventure: null,
            enigmas: null,
            videoPlaying: false,
            videoUrl: '',
            videoEnded: false,
            showCompass: false,
            geolocateShow: false,
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
                this.setState({videoUrl: adventure.videoAdventureIntroFilename});
            });

        // Get adventure's enigmas
        adventureService.getAdventureEnigmas(adventureId)
            .then(enigmas => {
                this.setState({enigmas});
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


        // Intro video playing
        if (!this.state.userAdvance) {
            this.setState({ videoPlaying: true });
        }
    }


    handleBackToGameInterface() {
        if (!this.state.userAdvance) {
            this.setState({userAdvance: 1, videoPlaying: true, videoUrl: this.state.enigmas[0].enigmaVideoIntroClue});

        } else {
            this.setState({videoPlaying: false, geolocateShow: true, showCompass: true});

            // Compass Bearing
            LocationCompass(this.state.adventure.lastEnigmaLatitude, this.state.adventure.lastEnigmaLongitude);
        }
    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }

    handleNearLocationDistance() {
        this.setState({videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false});
    }


    render() {

        console.log(this.state.enigmas);
        console.log(this.state.videoUrl);

        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
                    <div id="compass" className={this.state.showCompass ? 'compassVisible' : 'compassHidden'}>
                        <div id="arrow"><img src={logo}/></div>
                        <div id="notice"></div>
                        <div id="tiltLR"></div>
                        <div id="tiltFB"></div>
                        <div id="direction"></div>
                    </div>


                    { this.state.videoEnded && false &&
                        <button className="marronButton" onClick={() => {this.setState({videoPlaying: true, geolocateShow: false})}}>Revoir</button>
                    }

                    { this.state.videoPlaying && this.state.videoUrl &&
                        <div>
                            <VideoPlayerComponent
                                key={this.state.userAdvance}
                                videoUrl={this.state.videoUrl}
                                handleBackToGameInterface={this.handleBackToGameInterface}
                                onVideoEnded={this.onVideoEnded}
                            />
                        </div>
                    }

                    { !this.state.videoPlaying && this.state.geolocateShow &&
                        <GeolocateComponent
                            viewport={this.state.viewport}
                            handleViewportChange={this.handleViewportChange}
                            handleNearLocationDistance={this.handleNearLocationDistance}
                            destinationLat={this.state.adventure.lastEnigmaLatitude}
                            destinationLong={this.state.adventure.lastEnigmaLongitude}
                        />
                    }

                </div>
            </Fragment>
        );
    }
}