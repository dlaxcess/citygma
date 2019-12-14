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
            userAdvance: null,
            adventure: null,
            videoPlaying: false,
            videoUrl: '',
            videoEnded: false,
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
        this.setState({videoPlaying: false});
        this.setState({ geolocateShow: true });


        // Compass Bearing
        LocationCompass(this.state.adventure.lastEnigmaLatitude, this.state.adventure.lastEnigmaLongitude);
    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }

    handleNearLocationDistance() {
        this.setState({videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false});
    }


    render() {

        console.log(this.state.adventure);

        return (
            <Fragment>
                <div id="GameInterfaceGenContainer">
                    <div id="arrow"><img src={logo}/></div>
                    <div id="notice"></div>
                    <div id="tiltLR"></div>
                    <div id="tiltFB"></div>
                    <div id="direction"></div>


                    { this.state.videoEnded &&
                        <button className="marronButton" onClick={() => {this.setState({videoPlaying: true, geolocateShow: false})}}>Revoir</button>
                    }

                    { this.state.videoPlaying && this.state.videoUrl &&
                        <div>
                            <VideoPlayerComponent
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
                        />
                    }

                </div>
            </Fragment>
        );
    }
}