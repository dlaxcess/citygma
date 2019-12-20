import React, {Component, Fragment} from "react";
import { history } from "../../auth/helpers/history";
import { adventureService } from "./services/adventureService";

import GameControlsComponent from "./GameBottomControl/GameControlsComponent";
import VideoPlayerComponent from "./VideoPlayer/VideoPlayerComponent";
import { GeolocateComponent } from "./geoloc/GeolocateComponent";
//import {locationCompassService} from "./geoloc/locationCompassService";
import EnigmaQuestionAnswer from "./EnigmaQuestionAnswerComponent/EnigmaQuestionAnswer";
import logo from "../../../images/logo-citygma.png";




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
            userAdvance: 0,
            adventure: null,
            enigmas: null,
            currentLat : 48.1378304,
            currentLong: -1.687552,
            currentEnigmaActiveCompass: true,
            userDeviceAcceptCompass: true,

            videoPlaying: false,
            videoUrl: '',
            videoEnded: false,
            showCompass: false,
            geolocateShow: false,
            showEnigma: false,

            watchPositionId: null,
        };




        this.handleViewportChange = this.handleViewportChange.bind(this);

        this.handleBackToGameInterface = this.handleBackToGameInterface.bind(this);
        this.handleNearLocationDistance = this.handleNearLocationDistance.bind(this);
        this.handleEnigmaGoodAnswer = this.handleEnigmaGoodAnswer.bind(this);

        this.onVideoEnded = this.onVideoEnded.bind(this);

        this.handleReCenter = this.handleReCenter.bind(this);

        this.bearingListener = this.bearingListener.bind(this);
        this.getBearing = this.getBearing.bind(this);
        this.activateCompass = this.activateCompass.bind(this);
        this.watchPosbearingListener = this.watchPosbearingListener.bind(this);

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

        //this.smolScreen();

        document.removeEventListener('deviceorientation', this.bearingListener, false);
        navigator.geolocation.clearWatch(this.state.watchPositionId);
    }




    componentDidMount() {
        //this.fullScreen();
        /*try {
            await screen.orientation.lock("portrait");
            start();
        } catch (err) {
            alert.error(err);
        }*/
        /*addEventListener("orientationchange", function listener() {
            var rotate = 0 - screen.orientation;

            document.body.style.webkitTransform = "rotate(" + rotate + "deg)";
            document.body.style.MozTransform = "rotate(" + rotate + "deg)";
            document.body.style.transform = "rotate(" + rotate + "deg)";
            //screen.mozorientation.lock("portrait");
        });*/

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
                this.setState({currentLat: enigmas[0].enigmaLat, currentLong: enigmas[0].enigmaLong, currentEnigmaActiveCompass: enigmas[0].enigmaCompassActive});

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
        navigator.geolocation.clearWatch(this.state.watchPositionId);
    }

    handleEnigmaGoodAnswer() {
        const enigmaKey = Math.round(this.state.userAdvance) - 1;

        if (this.state.enigmas[enigmaKey]) {
            this.state.enigmas[enigmaKey].enigmaCompassActive ? this.setState({currentEnigmaActiveCompass: true}) : this.setState({currentEnigmaActiveCompass: false});

            this.setState({showEnigma: false, videoUrl: this.state.enigmas[enigmaKey].enigmaVideoIntroClue, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.enigmas[enigmaKey].enigmaLat, currentLong: this.state.enigmas[enigmaKey].enigmaLong});
            console.log('aftergoodanswer', this.state.userAdvance);
        } else {
            if (this.isFloat(this.state.userAdvance)) {
                if (this.state.userAdvance % 0.5 !== 0) {
                    this.setState({currentEnigmaActiveCompass: true, showEnigma: false, videoUrl: this.state.adventure.videoLastEnigmaFilename, videoPlaying: true, geolocateShow: false, showCompass: false, userAdvance: Math.round(this.state.userAdvance), currentLat: this.state.adventure.lastEnigmaLatitude, currentLong: this.state.adventure.lastEnigmaLongitude});
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

        /*function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        let options;


        options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        this.setState({watchPositionId: navigator.geolocation.watchPosition(this.watchPosbearingListener, error, options)});/**/

        if (window.DeviceOrientationEvent) {
            //document.getElementById("notice").innerHTML = "super ça marche.";
            window.addEventListener('deviceorientation', this.bearingListener, false);
        } else {
            document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund.";
        }/**/
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
        if (eventData.absolute) {
            let tiltLR = eventData.gamma;
            let tiltFB = eventData.beta;
            let alpha, webkitAlpha, bearedDir;

            let compassDisc = document.querySelector('#arrow>img');
            //Check for iOS property
            if(eventData.webkitCompassHeading) {
                alpha = eventData.webkitCompassHeading;
                //Rotation is reversed for iOS
                //compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
                navigator.geolocation.getCurrentPosition(position => {
                    //let webebkitBearedDir = this.wrap360(this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - alpha);
                    bearedDir = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - alpha;


                    compassDisc.style.webkitTransform = "rotate("+ webebkitBearedDir +"deg)";
                });
            }
            //non iOS
            else {
                alpha = eventData.alpha;
                webkitAlpha = eventData.alpha;
                if(!window.chrome) {
                    //Assume Android stock (this is crude, but good enough for our example) and apply offset
                    webkitAlpha = eventData.alpha-270;
                }
                /*compass.style.Transform = 'rotate(' + alpha + 'deg)';
                compass.style.WebkitTransform = 'rotate(' + webkitAlpha + 'deg)';
                //Rotation is reversed for FF
                compass.style.MozTransform = 'rotate(-' + alpha + 'deg)';*/

                navigator.geolocation.getCurrentPosition(position => {
                    let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    //bearedDir = this.wrap360(dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                    bearedDir = alpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    //let webKitBearedDir = this.wrap360(webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                    let webKitBearedDir = webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                    let mozBearedDir = fromNorthBearing - alpha;

                    compassDisc.style.transform = 'rotate(' + bearedDir + 'deg)';
                    compassDisc.style.WebkitTransform = 'rotate('+ webKitBearedDir + 'deg)';
                    //Rotation is reversed for FF
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


            let options;


            options = {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            };

            this.setState({watchPositionId: navigator.geolocation.watchPosition(this.watchPosbearingListener, error, options)});
        }

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }


        /*
                // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
                let tiltLR = eventData.gamma;

                // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
                let tiltFB = eventData.beta;

                let dir;
                //let bearedDir;

                let compassDisc = document.querySelector('#arrow>img');

                if(eventData.webkitCompassHeading) {
                    // Apple works only with this, alpha doesn't work
                    dir = eventData.webkitCompassHeading;

                    navigator.geolocation.getCurrentPosition(position => {
                        let webebkitBearedDir = this.wrap360(this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - dir);
                        //bearedDir = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - dir;


                        compassDisc.style.webkitTransform = "rotate("+ webebkitBearedDir +"deg)";
                    });
                }
                else {
                    dir = eventData.alpha;
                    let webkitAlpha = dir;
                    if(!window.chrome) {
                        //Assume Android stock (this is crude, but good enough for our example) and apply offset
                        webkitAlpha = dir-270;
                    }

                    navigator.geolocation.getCurrentPosition(position => {
                        let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                        //bearedDir = this.wrap360(dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                        let bearedDir = dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                        let webKitAlphaBearedDir = this.wrap360(webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                        //let webKitBearedDir = webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                        let mozBearedDir = fromNorthBearing - dir;

                        compassDisc.style.transform = 'rotate(' + bearedDir + 'deg)';
                        compassDisc.style.WebkitTransform = 'rotate('+ webKitAlphaBearedDir + 'deg)';
                        //Rotation is reversed for FF
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

        */


        /*
        if (eventData.absolute) {

            // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
            let tiltLR = eventData.gamma;

            // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
            let tiltFB = eventData.beta;

            let dir, webkitAlpha, bearedDir;

            let compassDisc = document.querySelector('#arrow>img');

            if(eventData.webkitCompassHeading) {
                // Apple works only with this, alpha doesn't work
                dir = eventData.webkitCompassHeading;

                navigator.geolocation.getCurrentPosition(position => {
                    //bearedDir = this.wrap360(this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - dir);
                    bearedDir = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong) - dir;


                    compassDisc.style.webkitTransform = "rotate("+ bearedDir +"deg)";
                });
            }
            else {
                dir = eventData.alpha;
                let webkitAlpha = dir;
                if(!window.chrome) {
                    //Assume Android stock (this is crude, but good enough for our example) and apply offset
                    webkitAlpha = dir-270;
                }
            }

            navigator.geolocation.getCurrentPosition(position => {
                let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                //bearedDir = this.wrap360(dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                bearedDir = dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                //let webKitBearedDir = this.wrap360(webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));
                let webKitBearedDir = webkitAlpha + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
                let mozBearedDir = fromNorthBearing - dir;

                compassDisc.style.transform = 'rotate(' + bearedDir + 'deg)';
                compassDisc.style.WebkitTransform = 'rotate('+ webKitBearedDir + 'deg)';
                //Rotation is reversed for FF
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


        } else {
            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            }

            let options;


            options = {
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0
            };

            this.setState({watchPositionId: navigator.geolocation.watchPosition(this.wtachPosbearingListener, error, options)});

        }*/







        // alpha: The direction the compass of the device aims to in degrees.
        //let dir = eventData.alpha;

        //this.handleReCenter();

        /*if (!eventData.absolute) {
            this.setState({userDeviceAcceptCompass: false})
        } else {
            this.setState({userDeviceAcceptCompass: true});
        }*/


        /*navigator.geolocation.getCurrentPosition(position => {
            let fromNorthBearing = this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong);
            let bearedDir = this.wrap360(dir + this.getBearing(position.coords.latitude, position.coords.longitude, this.state.currentLat, this.state.currentLong));

            // Call the function to use the data on the page.
            this.deviceOrientationHandler(tiltLR, tiltFB, fromNorthBearing, bearedDir);
        });*/

    }

    watchPosbearingListener(eventData) {
        let tiltLR = 0;
        let tiltFB = 0;

        let coords = eventData.coords;
        //let dir = coords.heading;

        let bearedDir = 0;

        let fromNorthBearing = this.getBearing(coords.latitude, coords.longitude, this.state.currentLat, this.state.currentLong);
        bearedDir = /*this.wrap360(*/this.getBearing(coords.latitude, coords.longitude, this.state.currentLat, this.state.currentLong) - coords.heading/*)*/;

        this.deviceOrientationHandler(tiltLR, coords.heading, fromNorthBearing, bearedDir);
    }




    render() {

        const {currentUser, onLogoutClick} = this.props;

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
                    <div id="compass" className={this.state.userDeviceAcceptCompass && this.state.showCompass && this.state.currentEnigmaActiveCompass ? 'compassVisible' : 'compassHidden'}>
                        <div id="arrow"><img src={logo}/></div>
                        <div id="notice"></div>
                        <div id="tiltLR"></div>
                        <br/><br/><br/>
                        <div id="tiltFB"></div>
                        <div id="direction"></div>
                    </div>


                    { this.state.videoEnded && false &&
                        <button className="marronButton" onClick={() => {this.setState({videoPlaying: true, geolocateShow: false})}}>Revoir</button>
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
                            enigmaId={enigmaId}
                            adventureId={this.state.adventure.adventureId}
                            enigmaQuestionPicture={enigmaQuestionPicture}
                            enigmaQuestionText={enigmaQuestionText}
                            handleEnigmaGoodAnswer={this.handleEnigmaGoodAnswer}
                        />
                    }

                    <GameControlsComponent
                        currentUser={currentUser}
                        onLogoutClick={onLogoutClick}
                    />

                </div>
            </Fragment>
        );
    }
}