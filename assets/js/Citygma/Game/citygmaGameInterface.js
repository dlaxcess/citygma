import React, {Component, Fragment} from "react";
import { history } from "../../auth/helpers/history";
import { adventureService } from "./services/adventureService";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
import LocationCompass from "./geoloc/LocationCompass";
import EnigmaQuestionAnswer from "./EnigmaQuestionAnswerComponent/EnigmaQuestionAnswer";
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
            showEnigma: false,
        };


        this.handleViewportChange = this.handleViewportChange.bind(this);

        this.handleBackToGameInterface = this.handleBackToGameInterface.bind(this);
        this.handleNearLocationDistance = this.handleNearLocationDistance.bind(this);
        this.handleEnigmaGoodAnswer = this.handleEnigmaGoodAnswer.bind(this);

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

    isStrictInt(value)
    {
        var er = /^[0-9]+$/;

        return ( er.test(value) ) ? true : false;
    }


    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    handleBackToGameInterface() {
        // Intro
        if (!this.state.userAdvance) {
            const enigmaKey = this.state.userAdvance;
            this.setState({userAdvance: 1, videoPlaying: true, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue});

        } else {
            // Enigmes finies >> Phase finale
            if (this.state.userAdvance === this.state.enigmas.length + 1) {
                this.setState({videoPlaying: false, geolocateShow: true, showCompass: true});

                // Compass Bearing
                LocationCompass(this.state.adventure.lastEnigmaLatitude, this.state.adventure.lastEnigmaLongitude);
            } else if (this.state.userAdvance === this.state.enigmas.length + 2) {
                history.push('/profil');
            } else {
                // Intro Enigme
                if (this.isInt(this.state.userAdvance)) {
                    const enigmaKey = this.state.userAdvance - 1;

                    this.setState({videoPlaying: false, geolocateShow: true, showCompass: true});

                    // Compass Bearing
                    LocationCompass(this.state.enigmas[enigmaKey].enigmaLat, this.state.enigmas[enigmaKey].enigmaLong);

                } else if (this.isFloat(this.state.userAdvance)) {
                    const enigmaKey = this.state.userAdvance.toFixed() - 2;

                    // Premier retour video historique
                    if(this.state.userAdvance % 0.5 === 0) {
                        this.setState({videoPlaying: false, showEnigma: true, userAdvance: this.state.userAdvance + 0.2});

                    // Retour d'interface enigme
                    } else {
                        this.setState({videoPlaying: false, geolocateShow: true, showCompass: true, showEnigma: false});

                        // Compass Bearing
                        LocationCompass(this.state.enigmas[enigmaKey].enigmaLat, this.state.enigmas[enigmaKey].enigmaLong);
                    }
                }
            }
        }
    }

    handleNearLocationDistance() {
        if (this.state.userAdvance > this.state.enigmas.length) {
            this.setState({videoPlaying: false, geolocateShow: false, showCompass: false, showEnigma: true, userAdvance: this.state.userAdvance + 0.5});
        } else {
            const enigmaKey = this.state.userAdvance - 1;
            this.setState({videoUrl: this.state.enigmas[enigmaKey].enigmaVideoHistoryInfo, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance + 0.5});

        }
    }

    handleEnigmaGoodAnswer() {
        const enigmaKey = this.state.userAdvance.toFixed() - 1;

        if (this.state.enigmas[enigmaKey]) {
            this.setState({showEnigma: false, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance.toFixed()});
        } else {
            if (this.isInt(this.state.userAdvance)) {
                this.setState({showEnigma: false, videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance.toFixed()});
            } else {
                this.setState({showEnigma: false, videoUrl: this.state.adventure.videoFinalSequenceFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance.toFixed()});
            }
        }
    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }




    render() {

        console.log(this.state.enigmas);
        console.log(this.state.videoUrl);
        console.log(this.state.adventure);

        // Current Enigma
        const enigmaId =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance > this.state.enigmas.length) ? null :
                    (this.state.userAdvance > 1) ? this.state.enigmas[this.state.userAdvance.toFixed() - 2].enigmaId : this.state.enigmas[0].enigmaId
                : ''
        ;

        const enigmaQuestionPicture =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance > this.state.enigmas.length) ? this.state.adventure.lastEnigmaPictureFilename :
                    (this.state.userAdvance > 1) ? this.state.enigmas[this.state.userAdvance.toFixed() - 2].enigmaQuestionPicture : this.state.enigmas[0].enigmaQuestionPicture
            : ''
        ;

        const enigmaQuestionText =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance > this.state.enigmas.length) ? this.state.adventure.lastEnigmaQuestionText :
                    (this.state.userAdvance > 1) ? this.state.enigmas[this.state.userAdvance.toFixed() - 2].enigmaQuestionText : this.state.enigmas[0].enigmaQuestionText
            : ''
        ;

        const destinationLat =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance > this.state.enigmas.length) ? this.state.adventure.lastEnigmaLatitude :
                    (this.state.userAdvance > 1) ? this.state.enigmas[this.state.userAdvance.toFixed() - 2].enigmaLat : this.state.enigmas[0].enigmaLat
                : 48.1378304
        ;

        const destinationLong =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance > this.state.enigmas.length) ? this.state.adventure.lastEnigmaLongitude :
                    (this.state.userAdvance > 1) ? this.state.enigmas[this.state.userAdvance.toFixed() - 2].enigmaLong : this.state.enigmas[0].enigmaLong
                : -1.6875520
        ;

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
                            destinationLat={destinationLat}
                            destinationLong={destinationLong}
                        />
                    }

                    { this.state.showEnigma &&
                        <EnigmaQuestionAnswer
                            enigmaId={enigmaId}
                            adventureId={this.state.adventure.adventureId}
                            enigmaQuestionPicture={enigmaQuestionPicture}
                            enigmaQuestionText={enigmaQuestionText}
                            handleEnigmaGoodAnswer={this.handleEnigmaGoodAnswer}
                        />
                    }

                </div>
            </Fragment>
        );
    }
}