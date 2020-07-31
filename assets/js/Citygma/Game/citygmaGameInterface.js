import React, {Component, Fragment} from "react";
import { history } from "../../auth/helpers/history";
import { adventureService } from "./services/adventureService";
import { userService } from "../../auth/services/userService";

import GameControlsComponent from "./GameBottomControl/GameControlsComponent";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
//import {locationCompassService} from "./geoloc/locationCompassService";
import EnigmaQuestionAnswer from "./EnigmaQuestionAnswerComponent/EnigmaQuestionAnswer";
import logo from "../../../images/logo-citygma.png";
import boussole from "../../../images/boussole.png";
import {NavLink} from "react-router-dom";
import {authenticationService} from "../../auth/services/authenticationService";




export default class CitygmaGameInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // react-map-gl
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: 48.1378304,
                longitude: -1.6875520000000002,
                zoom: 16
            },
            // Game Data
            showEnterGameScreen: true,
            user: null,
            userAdvance: 0,
            adventure: null,
            enigmas: null,
            currentLat : 48.1378304,
            currentLong: -1.687552,
            currentEnigmaActiveCompass: true,
            userDeviceAcceptCompass: true,
            deviceOrientationAvailable: false,
            deviceOrientationWorksAbsolute: false,

            videoPlaying: false,
            videoUrl: '',
            videoEnded: false,
            showCompass: false,
            geolocateShow: false,
            showEnigma: false,

            watchPositionId: null,
        };




        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleViewportChange = this.handleViewportChange.bind(this);

        this.storeUserAdvance = this.storeUserAdvance.bind(this);

        this.handleBackToGameInterface = this.handleBackToGameInterface.bind(this);
        this.handleNearLocationDistance = this.handleNearLocationDistance.bind(this);
        this.handleEnigmaGoodAnswer = this.handleEnigmaGoodAnswer.bind(this);

        this.onVideoEnded = this.onVideoEnded.bind(this);
        this.handleReloadCurrentVideo = this.handleReloadCurrentVideo.bind(this);
        this.handleLoupeClick = this.handleLoupeClick.bind(this);

        this.handleReCenter = this.handleReCenter.bind(this);

        this.bearingListener = this.bearingListener.bind(this);
        this.getBearing = this.getBearing.bind(this);
        this.activateCompass = this.activateCompass.bind(this);
        this.deviceOrientationWorks = this.deviceOrientationWorks.bind(this);

        this.watchPosbearingListener = this.watchPosbearingListener.bind(this);
        this.testDeviceOrientation = this.testDeviceOrientation.bind(this);


    }

    fullScreen() {
        // Kind of painful, but this is how it works for now
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }

        screen.orientation.lock("portrait");
    }

    smolScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    componentWillUnmount() {
        this.props.toggleHeader(true);

        this.smolScreen();

        document.removeEventListener('deviceorientation', this.bearingListener, false);
        navigator.geolocation.clearWatch(this.state.watchPositionId);
    }




    componentDidMount() {
        document.removeEventListener('deviceorientation', this.bearingListener, false);
        navigator.geolocation.clearWatch(this.state.watchPositionId);

        let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        let iOSsec = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        //console.log(iOS, iOSsec);
        if (!iOS && !iOSsec) {
            this.fullScreen();
        }

        this.props.toggleHeader(false);



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

                userService.getCurrentUser().then(user => {
                    this.setState({user: user});

                    //mise à jour userAdvance
                    userService.getCurrentUserAdvance(user.id, adventureId)
                        .then(data => {
                            this.setState({userAdvance: data.userAdvance});
                            console.log('Stored useradvance', data.userAdvance);

                            let enigmaKey;
                            if (!data.userAdvance) {
                                enigmaKey = 0;
                            } else if (this.isInt(data.userAdvance)) {
                                enigmaKey = data.userAdvance -1;
                            } else {
                                enigmaKey = Math.round(data.userAdvance) -2;
                            }

                            this.setState({currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong, currentEnigmaActiveCompass: this.state.enigmas[enigmaKey].enigmaCompassActive});
                        });

                });
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
    }

    storeUserAdvance(userAdvance) {
        userService.setCurrentUserAdvance(this.state.user.id, this.state.adventure.adventureId, userAdvance)
            .then(data => {
                console.log(data);
            })
    }


    isInt(n){
        return Number(n) === n && n % 1 === 0;
    }

    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    handleStartGame() {
        /*document.removeEventListener('deviceorientation', this.bearingListener, false);
        navigator.geolocation.clearWatch(this.state.watchPositionId);*/
        // Intro video playing
        if (!this.state.userAdvance) {
            this.setState({videoPlaying: true, showEnterGameScreen: false});
        }else if (this.state.userAdvance === this.state.enigmas.length + 1) {
            this.setState({videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false, showEnterGameScreen: false, currentLat: this.state.adventure.lastEnigmaLatitude, currentLong: this.state.adventure.lastEnigmaLongitude});

            // Compass Bearing
            this.activateCompass();
        }else if (this.state.userAdvance > this.state.enigmas.length + 1 && this.isFloat(this.state.userAdvance)) {
            /*if (this.state.userAdvance % 0.5 === 0) {*/
                this.setState({videoPlaying: false, geolocateShow: false, showCompass: false, showEnigma: true, showEnterGameScreen: false});
            /*} else {
                this.setState({videoUrl: this.state.adventure.videoFinalSequenceFilename, videoPlaying: true, geolocateShow: false, showCompass: false});
            }*/
        }else if (this.state.userAdvance === this.state.enigmas.length + 2) {
            this.setState({videoUrl: this.state.adventure.videoFinalSequenceFilename, videoPlaying: true, geolocateShow: false, showCompass: false, showEnterGameScreen: false});
        }else {
            if (this.isInt(this.state.userAdvance)) {
                const enigmaKey = this.state.userAdvance - 1;
                this.setState({currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong, currentEnigmaActiveCompass: this.state.enigmas[enigmaKey].enigmaCompassActive});
                this.setState({videoPlaying: true, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, showEnterGameScreen: false, geolocateShow: false, showCompass: false, showEnigma: false});

            } else if (this.isFloat(this.state.userAdvance)) {
                const enigmaKey = Math.round(this.state.userAdvance) - 2;
                console.log('test', this.state.userAdvance % 0.);
                if(this.state.userAdvance % 0.5 === 0) {
                    console.log('test', this.state.userAdvance % 0.);
                    this.setState({videoUrl: this.state.enigmas[enigmaKey].enigmaVideoHistoryInfo, videoPlaying: true, showEnigma: false, geolocateShow: false, showCompass: false, showEnterGameScreen: false});
                } else if (this.state.userAdvance % 0.5 !== 0) {
                    console.log('test', this.state.userAdvance % 0.5);
                    this.setState({showEnigma: true, showEnterGameScreen: false});
                }
            }
        }
    }

    handleBackToGameInterface() {

        // Intro
        if (!this.state.userAdvance) {
            const enigmaKey = this.state.userAdvance;
            this.setState({userAdvance: 1, videoPlaying: true, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, showEnterGameScreen: false});

            this.storeUserAdvance(1);

        } else {
            // Enigmes finies >> Phase finale
            if (this.state.userAdvance === this.state.enigmas.length + 1) {
                this.setState({videoPlaying: false, geolocateShow: true, showCompass: true, showEnterGameScreen: false});

                // Compass Bearing
                this.activateCompass();
            } else if (this.state.userAdvance === this.state.enigmas.length + 2) {
                document.removeEventListener('deviceorientation', this.bearingListener, false);
                history.push('/profil');
            } else {
                // Retour Intro Enigme
                if (this.isInt(this.state.userAdvance)) {
                    const enigmaKey = this.state.userAdvance - 1;

                    this.setState({videoPlaying: false, geolocateShow: true, showCompass: true, showEnterGameScreen: false});

                    // Compass Bearing
                    this.activateCompass();
                    this.storeUserAdvance(this.state.userAdvance);

                } else if (this.isFloat(this.state.userAdvance)) {
                    const enigmaKey = Math.round(this.state.userAdvance) - 2;

                    // Premier retour video historique
                    if(this.state.userAdvance % 0.5 === 0) {
                        this.setState({videoPlaying: false, showEnigma: true, userAdvance: this.state.userAdvance + 0.2, geolocateShow: false, showCompass: false, showEnterGameScreen: false});

                        this.storeUserAdvance(this.state.userAdvance + 0.2);
                    // Retour d'interface enigme
                    } else {
                        this.setState({showEnigma: true, showEnterGameScreen: false});
                        //this.setState({videoPlaying: false, geolocateShow: true, showCompass: true, showEnigma: false});

                        // Compass Bearing
                        //this.activateCompass();
                    }
                }
            }
        }
    }

    handleNearLocationDistance() {
        if (this.state.userAdvance > this.state.enigmas.length) {
            this.setState({videoPlaying: false, geolocateShow: false, showCompass: false, showEnigma: true, userAdvance: this.state.userAdvance + 0.5, showEnterGameScreen: false});

            this.storeUserAdvance(this.state.userAdvance + 0.5);
        } else {
            const enigmaKey = this.state.userAdvance - 1;
            this.setState({videoUrl: this.state.enigmas[enigmaKey].enigmaVideoHistoryInfo, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: this.state.userAdvance + 0.5, currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong, showEnterGameScreen: false});

            this.storeUserAdvance(this.state.userAdvance + 0.5);
        }
        document.removeEventListener('deviceorientation', this.bearingListener, false);
        navigator.geolocation.clearWatch(this.state.watchPositionId);
    }

    handleEnigmaGoodAnswer() {
        const enigmaKey = Math.round(this.state.userAdvance) - 1;

        if (this.state.enigmas[enigmaKey]) {
            this.state.enigmas[enigmaKey].enigmaCompassActive ? this.setState({currentEnigmaActiveCompass: true}) : this.setState({currentEnigmaActiveCompass: false});

            this.setState({showEnigma: false, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong, showEnterGameScreen: false});

            this.storeUserAdvance(Math.round(this.state.userAdvance));

        } else {
            if (this.isFloat(this.state.userAdvance)) {
                if (this.state.userAdvance % 0.5 !== 0) {
                    this.setState({currentEnigmaActiveCompass: true, showEnigma: false, videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.adventure.lastEnigmaLatitude, currentLong: this.state.adventure.lastEnigmaLongitude, showEnterGameScreen: false});
                    this.storeUserAdvance(Math.round(this.state.userAdvance));
                }else {
                    this.setState({/*currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong, */showEnigma: false, videoUrl: this.state.adventure.videoFinalSequenceFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), showEnterGameScreen: false});
                    this.storeUserAdvance(Math.round(this.state.userAdvance));
                }
            }
        }

    }

    onVideoEnded() {
        this.setState({videoEnded: true});
    }

    handleReloadCurrentVideo() {
        this.setState({showEnigma: false, videoPlaying: true, geolocateShow: false, showCompass: false});
    }

    handleLoupeClick() {
        this.state.showEnigma ? this.setState({showEnigma: false}) : this.setState({showEnigma: true});
        this.state.userAdvance % 0.5 > 0 && this.setState({videoPlaying: true});
    }

    handleViewportChange(viewport) {
        this.setState({ viewport: viewport });
    }

    handleReCenter() {
        navigator.geolocation.getCurrentPosition(position => {
            let newViewport = {
                height: "100vh",
                width: "100vw",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 16
            };
            this.setState({
                viewport: newViewport
            });
        });
    }

    // Compass
    activateCompass() {

        /*Promise.all([navigator.permissions.query({ name: "accelerometer" }),
            navigator.permissions.query({ name: "magnetometer" }),
            navigator.permissions.query({ name: "gyroscope" })])
            .then(results => {
                if (results.every(result => result.state === "granted")) {*/
                    //alert('active compass autorise');
                    if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
                        //document.getElementById("notice").innerHTML = "super ça marche.";
                        window.addEventListener('deviceorientation', this.bearingListener, false);

                    }else {
                        alert('Votre téléphone n\'est pas équipé de système permettant la détection de son orientation.');
                    }


                /*} else {
                    alert('Vous devez activer le partage de la géolocalisation de votre téléphone si vous souhaitez que la boussole fonctionne.');
                }
            });*/
    }

    error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    deviceOrientationWorks() {
        let deviceOrientationWorksAbsolute =true;
        function absoluteTest(event) {
            if (event.absolute == true) {
                //this.setState({deviceOrientationWorksAbsolute: true});
                document.removeEventListener('deviceorientation', absoluteTest, false);
                return true;
            } else {
                //this.setState({deviceOrientationWorksAbsolute: false});
                document.removeEventListener('deviceorientation', absoluteTest, false);
                return false;
            }

        }

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', absoluteTest, false);
        }

        /*let options;

        options = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };

        this.setState({watchPositionId: navigator.geolocation.watchPosition(this.watchPosbearingListener, this.error, options)});*/
    }

    testDeviceOrientation(event) {
        if (eventData.absolute) {
            this.setState({deviceOrientationAvailable: true});
        } else {
            this.setState({deviceOrientationAvailable: false});
        }
    }

    deviceOrientationHandler(tiltLR, tiltFB, fromNorthBearing, bearedDir) {
        /*document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);*/
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
        //navigator.geolocation.clearWatch(this.state.watchPositionId);
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


        return /*this.wrap360(*/this.toDegrees(bearingRad)/*)*/;
    }

    wrap360(degrees) {
        if (0<=degrees && degrees<360) return degrees; // avoid rounding due to arithmetic ops if within range
        return (degrees%360+360) % 360; // sawtooth wave p:360, a:360
    }

    bearingListener(eventData) {
        if (eventData.alpha !== null) {
            let tiltLR = eventData.gamma;
            let tiltFB = eventData.beta;
            let alpha, webkitAlpha, bearedDir, iOsBearedDir;
            let compassDisc = document.querySelector('#arrow>img');
            //Check for iOS property
            /* A VIRER alert("avec alpha");/* A VIRER */

            if(eventData.webkitCompassHeading) {
                /* A VIRER alert("avec IOS");/* A VIRER */
                //alpha = eventData.webkitCompassHeading;
                //Rotation is reversed for iOS
                //compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
                navigator.geolocation.getCurrentPosition(position => {
                    //let webebkitBearedDir = this.wrap360(this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - alpha);
                    iOsBearedDir = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - eventData.webkitCompassHeading;


                    compassDisc.style.webkitTransform = "rotate("+ iOsBearedDir +"deg)";
                    /*compassDisc.style.transform = 'rotate(' + iOsBearedDir + 'deg)';
                    compassDisc.style.MozTransform = 'rotate(' + iOsBearedDir + 'deg)';*/
                });
            }
            //non iOS
            else {
                /* A VIRER alert("avec tel giro");/* A VIRER */
                alpha = eventData.alpha;
                webkitAlpha = eventData.alpha;
                if(!window.chrome) {
                    //Assume Android stock (this is crude, but good enough for our example) and apply offset
                    webkitAlpha = eventData.alpha - 270;
                    /* A VIRER alert("avec truc chelou -270");/* A VIRER */
                }
                /*compass.style.Transform = 'rotate(' + alpha + 'deg)';
                compass.style.WebkitTransform = 'rotate(' + webkitAlpha + 'deg)';
                //Rotation is reversed for FF
                compass.style.MozTransform = 'rotate(-' + alpha + 'deg)';*/
                /* A VIRER alert("Puis gros bordel differents explorateurs");/* A VIRER */
                navigator.geolocation.getCurrentPosition(position => {
                    let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    //bearedDir = this.wrap360(dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                    bearedDir = alpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    let webKitBearedDir = this.wrap360(webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                    //let webKitBearedDir = webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    let mozBearedDir = alpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);

                    compassDisc.style.transform = 'rotate(-' + bearedDir + 'deg)';
                    compassDisc.style.WebkitTransform = 'rotate('+ webKitBearedDir + 'deg)';
                    //Rotation is reversed for FF
                    /* test milou *** compassDisc.style.MozTransform = 'rotate(' + mozBearedDir + 'deg)'; *** test milou */
                    compassDisc.style.MozTransform = 'rotate(' + mozBearedDir + 'deg)';

                    let positionMarker = document.querySelector('#positionMarker');
                    if (positionMarker) {
                        positionMarker.style.webkitTransform = "rotate("+ fromNorthBearing +"deg)";
                        positionMarker.style.MozTransform = "rotate("+ fromNorthBearing +"deg)";
                        positionMarker.style.transform = "rotate("+ fromNorthBearing +"deg)";
                    }

                    // Call the function to use the data on the page.
                    //this.deviceOrientationHandler(tiltLR, tiltFB, fromNorthBearing, bearedDir);
                });
            }

        } else {

            /* A VIRER alert("Sans alpha avec watchPosition au lieu de listener");/* A VIRER */
            let options;


            options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            this.setState({watchPositionId: navigator.geolocation.watchPosition(this.watchPosbearingListener, this.error, options)});
        }

    }

    watchPosbearingListener(eventData) {
        let tiltLR = 0;
        let tiltFB = 0;
        //document.getElementById("tiltFB").innerHTML = "Youpiyoup";
        //let coords = eventData.coords;
        //let dir = coords.heading;

        let bearedDir = 0;

        let fromNorthBearing = this.getBearing(eventData.coords.latitude, eventData.coords.longitude, this.state.currentLat, this.state.currentLong);
        bearedDir = /*this.wrap360(*/this.getBearing(eventData.coords.latitude, eventData.coords.longitude, this.state.currentLat, this.state.currentLong) - eventData.coords.heading/*)*/;

        //document.getElementById("tiltFB").innerHTML = Math.ceil(eventData.coords.heading);
        //document.getElementById("direction").innerHTML = Math.ceil(bearedDir);

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

        //this.deviceOrientationHandler(tiltLR, coords.heading, fromNorthBearing, bearedDir);
    }




    render() {

        const {currentUser, onLogoutClick} = this.props;

        console.log(this.state.enigmas);
        console.log(this.state.adventure);
        {this.state.user && console.log('currentUser', this.state.user.id);}

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

                <div id="landscapePleaseChangeOrientation"><h2>S&lsquo;il vous plais, pour le bon fonctionnement du jeu, veuillez passez votre écran en mode portrait :)</h2></div>

                <div id="GameInterfaceGenContainer" onClick={this.fullScreen}>
                    { this.state.showEnterGameScreen &&
                    <div id="enterGameScreen">
                        <NavLink to="/Profil">...Retour, j&lsquo;ai trop peur...</NavLink>
                        <h2>Mises en garde ...</h2>
                        <p>Bienvenue sur citygma, sans vouloir faire de la pub pour chrome, pour une meilleure expérience de jeu, nous vous conseillons d'utiliser l&lsquo;explorateur internet, chrome.</p>
                        <p>Si par malheur votre boussole reste bloquée vers le haut de votre écran... alors fiez vous uniquement à la distance...!</p>
                        <p>Si votre boussole indique plusieurs directions aléatoires à la suite, afin qu'elle commence à donner une direction fiable, veuillez marcher pendant au moins 20m avant de vous y fier réellement...</p>
                        <p>Si vous avez besoin d&lsquo;aide, cliquez sur le point d&lsquo;interogation sur l&lsquo;interface de jeu</p>
                        <button className="marronButton" onClick={this.handleStartGame}>Êtes vous sûr de voiloir commencer l'aventure ?</button>

                    </div>
                    }


                    <div id="compass" className={this.state.userDeviceAcceptCompass && this.state.showCompass && this.state.currentEnigmaActiveCompass ? 'compassVisible' : 'compassHidden'}>
                        <div id="arrow"><img src={boussole}/></div>
                        <div id="notice"></div>
                        <div id="tiltLR"></div>
                        <br/><br/><br/>
                        <div id="tiltFB"></div>
                        <div id="direction"></div>
                    </div>


                    { /*this.state.videoEnded && false true &&
                        <button className="marronButton" onClick={() => {this.setState({videoPlaying: true, geolocateShow: false})}}>Revoir</button>*/
                    }

                    { this.state.videoPlaying && this.state.videoUrl &&
                            <VideoPlayerComponent
                                key={this.state.userAdvance}
                                videoUrl={this.state.videoUrl}
                                handleBackToGameInterface={this.handleBackToGameInterface}
                                onVideoEnded={this.onVideoEnded}
                            />
                    }

                    { !this.state.videoPlaying && this.state.geolocateShow &&
                        <GeolocateComponent
                            viewport={this.state.viewport}
                            handleViewportChange={this.handleViewportChange}
                            handleNearLocationDistance={this.handleNearLocationDistance}
                            destinationLat={destinationLat}
                            destinationLong={destinationLong}
                            currentEnigmaActiveCompass={this.state.currentEnigmaActiveCompass}
                            handleReCenter={this.handleReCenter}
                        />
                    }

                    { this.state.showEnigma &&
                        <EnigmaQuestionAnswer
                            showCurrentEnigma={!this.isInt(this.state.userAdvance)}
                            onLoupeClick={this.handleLoupeClick}
                            enigmaId={enigmaId}
                            adventureId={this.state.adventure.adventureId}
                            enigmaQuestionPicture={enigmaQuestionPicture}
                            enigmaQuestionText={enigmaQuestionText}
                            handleEnigmaGoodAnswer={this.handleEnigmaGoodAnswer}
                        />
                    }

                    {this.state.enigmas &&
                    <GameControlsComponent
                        currentUser={currentUser}
                        onLogoutClick={this.props.onLogoutClick}
                        onPersoPictoClick={this.handleReloadCurrentVideo}
                        onLoupeClick={this.handleLoupeClick}
                        userAdvance={this.state.userAdvance}
                        enigmas={this.state.enigmas}
                    />
                    }

                </div>
            </Fragment>
        );
    }
}