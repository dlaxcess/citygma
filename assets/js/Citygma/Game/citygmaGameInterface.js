import React, {Component, Fragment} from "react";
import { history } from "../../auth/helpers/history";
import { adventureService } from "./services/adventureService";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
import {locationCompassService} from "./geoloc/locationCompassService";
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
            currentLat : 48.1378304,
            currentLong: -1.687552,
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

        this.bearingListener = this.bearingListener.bind(this);
        this.getBearing = this.getBearing.bind(this);
        this.activateCompass = this.activateCompass.bind(this);
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
                this.setState({currentLat: enigmas[0].enigmaLat, currentLong: enigmas[0].enigmaLong});

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
                this.activateCompass();
            } else if (this.state.userAdvance === this.state.enigmas.length + 2) {
                document.removeEventListener('deviceorientation', this.bearingListener, false);
                history.push('/profil');
            } else {
                // Retour Intro Enigme
                if (this.isInt(this.state.userAdvance)) {
                    const enigmaKey = this.state.userAdvance - 1;

                    this.setState({videoPlaying: false, geolocateShow: true, showCompass: true});

                    console.log('current useradvance', this.state.userAdvance);
                    console.log(this.state.currentLat, this.state.currentLong);
                    // Compass Bearing
                    this.activateCompass();


                } else if (this.isFloat(this.state.userAdvance)) {
                    const enigmaKey = Math.round(this.state.userAdvance) - 2;

                    // Premier retour video historique
                    if(this.state.userAdvance % 0.5 === 0) {
                        this.setState({videoPlaying: false, showEnigma: true, userAdvance: this.state.userAdvance + 0.2, geolocateShow: false, showCompass: false});

                    // Retour d'interface enigme
                    } else {
                        this.setState({videoPlaying: false, geolocateShow: true, showCompass: true, showEnigma: false, currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong});

                        // Compass Bearing
                        this.activateCompass();
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
            this.setState({videoUrl: this.state.enigmas[enigmaKey].enigmaVideoHistoryInfo, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance + 0.5, currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong});

        }
        document.removeEventListener('deviceorientation', this.bearingListener, false);
    }

    handleEnigmaGoodAnswer() {
        const enigmaKey = Math.round(this.state.userAdvance) - 1;

        if (this.state.enigmas[enigmaKey]) {

            this.setState({showEnigma: false, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong});
            console.log('aftergoodanswer', this.state.userAdvance);
        } else {
            if (this.isFloat(this.state.userAdvance)) {
                if (this.state.userAdvance % 0.5 !== 0) {
                    this.setState({showEnigma: false, videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.adventure.lastEnigmaLatitude, currentLong: this.state.adventure.lastEnigmaLongitude});
                }else {
                    this.setState({showEnigma: false, videoUrl: this.state.adventure.videoFinalSequenceFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance)});
                }
            }
        }

    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });

    }

    // Compass
    activateCompass() {
        if (window.DeviceOrientationEvent) {
            document.getElementById("notice").innerHTML = "super ça marche.";
            window.addEventListener('deviceorientation', this.bearingListener, false);
        } else {
            document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund.";
        }
    }

    deviceOrientationHandler(tiltLR, tiltFB, fromNorthBearing, bearedDir) {
        document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
        document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
        document.getElementById("direction").innerHTML = Math.ceil(bearedDir);

        // Rotate the disc of the compass.
        let compassDisc = document.querySelector('#arrow>img');
        let positionMarker = document.querySelector('#positionMarker');
        compassDisc.style.webkitTransform = "rotate("+ bearedDir +"deg)";
        compassDisc.style.MozTransform = "rotate("+ bearedDir +"deg)";
        compassDisc.style.transform = "rotate("+ bearedDir +"deg)";

        if (positionMarker) {
            positionMarker.style.webkitTransform = "rotate("+ fromNorthBearing +"deg)";
            positionMarker.style.MozTransform = "rotate("+ fromNorthBearing +"deg)";
            positionMarker.style.transform = "rotate("+ fromNorthBearing +"deg)";
        }

    }

    toRadians(degrees) {
        const pi = Math.PI;
        return degrees * (pi/180);
    }

    toDegrees(radians) {
        const pi = Math.PI;
        return radians * (180/pi);
    }

    getBearing(lat1, long1, lat2, long2) {
        let lat1Rad = this.toRadians(lat1);
        let lat2Rad = this.toRadians(lat2);
        let deltaLng = this.toRadians(long2 - long1);

        let x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLng);
        let y = Math.sin(deltaLng) * Math.cos(lat2Rad);
        let bearingRad = Math.atan2(y, x);


        return this.toDegrees(bearingRad);
    }

    bearingListener(eventData) {
        // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
        let tiltLR = eventData.gamma;

        // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
        let tiltFB = eventData.beta;

        // alpha: The direction the compass of the device aims to in degrees.
        let dir = eventData.alpha;

        navigator.geolocation.getCurrentPosition(position => {
            let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
            let bearedDir = dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);

            // Call the function to use the data on the page.
            this.deviceOrientationHandler(tiltLR, tiltFB, fromNorthBearing, bearedDir);
        });

    }




    render() {

        console.log(this.state.enigmas);
        console.log(this.state.videoUrl);
        console.log(this.state.adventure);

        // Current Enigma
        const enigmaId =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance >= 1 + this.state.enigmas.length) ? 'none' :
                    (this.state.userAdvance > 1) ? this.state.enigmas[Math.round(this.state.userAdvance) - 2].enigmaId : this.state.enigmas[0].enigmaId
                : ''
        ;
        console.log('id', enigmaId);
        console.log(this.state.userAdvance);
        console.log(Math.round(this.state.userAdvance));

        const enigmaQuestionPicture =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance >= 1 + this.state.enigmas.length) ? this.state.adventure.lastEnigmaPictureFilename :
                    (this.state.userAdvance > 1) ? this.state.enigmas[Math.round(this.state.userAdvance) - 2].enigmaQuestionPicture : this.state.enigmas[0].enigmaQuestionPicture
            : ''
        ;

        const enigmaQuestionText =
            this.state.adventure && this.state.enigmas ?
                (this.state.userAdvance >= 1 + this.state.enigmas.length) ? this.state.adventure.lastEnigmaQuestionText :
                    (this.state.userAdvance > 1) ? this.state.enigmas[Math.round(this.state.userAdvance) - 2].enigmaQuestionText : this.state.enigmas[0].enigmaQuestionText
            : ''
        ;

        const destinationLat =
            this.state.adventure && this.state.enigmas && this.state.currentLat ?
                (this.state.userAdvance >= 1 + this.state.enigmas.length) ? this.state.adventure.lastEnigmaLatitude :
                    this.state.currentLat
                    //(this.state.userAdvance > 1) ? this.state.enigmas[Math.round(this.state.userAdvance) - 1].enigmaLat : this.state.enigmas[0].enigmaLat
                : 48.1378304
        ;

        const destinationLong =
            this.state.adventure && this.state.enigmas && this.state.currentLong ?
                (this.state.userAdvance >= 1 + this.state.enigmas.length) ? this.state.adventure.lastEnigmaLongitude :
                    this.state.currentLong
                    //(this.state.userAdvance > 1) ? this.state.enigmas[Math.round(this.state.userAdvance) - 1].enigmaLong : this.state.enigmas[0].enigmaLong
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