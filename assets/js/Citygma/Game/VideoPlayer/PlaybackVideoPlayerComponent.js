import React, {Component, Fragment} from 'react'

import ReactPlayer, {player} from "react-player";
import { uploadsDir } from "../../ConstData/uploadsDir";

import { Player, ControlBar } from 'video-react';



export default class VideoPlayerComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: this.props.videoUrl,



            url: this.props.videoUrl,
            pip: false,
            playing: false,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,

            player: {
                playing: false,
                videoPlaying: this.props.videoPlaying,
                displaySound: this.props.displayVideo,
            },
            showEndedButton: false,
            skipVideo: this.props.skipVideo,
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.seek = this.seek.bind(this);
        this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.setMuted = this.setMuted.bind(this);
        this.setUnMutedTimedOut = this.setUnMutedTimedOut.bind(this);


        /*this.load = this.load.bind(this);*/
        this.handlePlay = this.handlePlay.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.ref = this.ref.bind(this);

        const {onVideoEnded} = this.props.onVideoEnded;


    }

    componentDidMount() {
        {/* this.props.videoUrl &&
            this.setState({ playing: true });
            document.querySelector("#videoPlay").click();
        */}
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    }

    componentDidUpdate(prevProps, prevState) {
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));

        /*var timeOutID = window.setTimeout( function () {
            if (!this.state.showEndedButton) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
                document.getElementById("videoRePlay").dispatchEvent(evt);
            }
        }, 5000);*/

        /*if (this.props.videoPlaying) {
            if(this.props.videoPlaying !== prevProps.videoPlaying) {

                if (!this.props.displayVideo) {
                    this.pause();
                }
            }
        }*/
        /*if (this.props.skipVideo) {
            if (!this.state.playing) {
                if (this.state.playing !== prevState.playing) {
                    this.props.handleBackToGameInterface();
                }
            }
        }


        if (!this.props.displayVideo) {
            if(this.props.displayVideo === prevProps.displayVideo) {
            this.pause();
            }
        }

        if (this.props.displayVideo) {
            if(this.props.displayVideo !== prevProps.displayVideo) {
                this.play();

            }
        }

        if (this.props.videoPlaying && this.props.displayVideo) {
            //this.setMuted(false);
            if(this.props.videoPlaying !== prevProps.videoPlaying && this.props.displayVideo !== prevProps.displayVideo) {
                this.play();
            }
        }*/

    }

    setMuted(muted) {
        return () => {
            this.player.muted = muted;
        };
    }

    setUnMutedTimedOut() {
        return () => {
            this.player.muted = false;
        };
    }

    handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
            player: state
        });

        console.log('playingchange: ' + this.props.videoPlaying + 'soundChange: ' + this.props.displayVideo);

        /*if (this.state.player.videoPlaying && this.state.player.displaySound) {
            //var timeOutID = window.setTimeout( this.play, 2000);
            this.play();

        }*/

        /*if (!this.state.player.videoPlaying && !this.state.player.displaySound) {
            this.pause();
        }

        if (this.state.player.videoPlaying && !this.state.player.displaySound) {
            this.pause();
        }*/

        /*if (!this.state.player.displaySound) {
            //this.play();
            this.pause();
            this.setState({playing: false});
        }

        if (this.state.player.displaySound) {
            this.play();
            this.setState({playing: true});
        }*/

        /*if (!this.props.displaySound) {
            this.player.muted = false;
        }

        if (this.props.displaySound) {
            this.player.muted = false;
        }*/

        if (this.state.player.hasStarted) {
            this.setState({playing: true});

            /*if(this.state.player.displaySound) {
                this.player.play();
            }*/
            //var timeOutID = window.setTimeout( this.setUnMutedTimedOut(), 2000);
            //this.setState({muted: false});
        }

        if (this.state.player.ended) {
            this.handleEnded()
        }

    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    load() {
        this.player.load();

    }

    changeCurrentTime(seconds) {
        return () => {
            const { player } = this.player.getState();
            this.player.seek(player.currentTime + seconds);
        };
    }

    seek(seconds) {
        return () => {
            this.player.seek(seconds);
        };
    }

    changePlaybackRateRate(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.playbackRate = player.playbackRate + steps;
        };
    }

    changeVolume(steps) {
        return () => {
            const { player } = this.player.getState();
            this.player.volume = player.volume + steps;
        };
    }

    changeSource(name) {
        return () => {
            this.setState({
                source: sources[name]
            });
            this.player.load();
        };
    }

    /*load() {
        this.state.player.seekTo(0);
        this.setState({
            playing: true,
            played: 0,
            loaded: 0,
            pip: false,
            showEndedButton: false
        })
    }*/




    handlePlay() {
        console.log('onPlay');
        this.setState({ playing: true });
    }

    handleEnded() {
        this.setState({showEndedButton: true, playing: false});
        this.props.onVideoEnded();
    }

    ref(player) {
        this.setState({player: player});
    }



    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        /*var timeOutID = window.setTimeout( function () {
            //if (true) {
                //var evt = document.createEvent("MouseEvents");
                //evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
                //document.getElementById("videoRePlay").dispatchEvent(evt);
            //}
            this.setMuted(false);
        }, 1000);*/
        /*const cssDisplayVideo = this.props.displayVideo ? 'displayVideo' : 'hideVideo';*/

        return (
            /*setTimeout(this.setMuted(false), 1000);*/
            <section className="playerSection playbackPlayer">
                <div id="playerBubulle"></div>
                <div id="playerBackground"></div>
                <div id="videoPlayerButtons">
                    {/*<button id="videoPlay" className="marronButton" onClick={this.handlePlay}>Lire</button>*/}
                    {this.state.showEndedButton && !this.state.playing &&
                        <button className="marronButton" onClick={this.props.handleBackFromPlaybackVideo}>Poursuivre</button>
                    }
                    {!this.state.playing &&
                        <button id="videoRePlay" className="marronButton" onClick={this.play}>{this.state.showEndedButton ? "Revoir" : "Lire"}</button>
                    }

                </div>

                <div className="player-wrapper">
                    <Player
                        className="react-player"
                        ref={player => {
                            this.player = player;
                        }}
                        /*muted = {this.state.muted}*/
                        autoPlay
                        webkit-playsinline
                        playsInline
                        ended={this.handleEnded}
                    >
                        <source src={`${uploadsDir.getUploadsDir()}${url}`} type="video/mp4" />
                        <ControlBar autoHide={true} disableCompletely={true} />
                    </Player>
                </div>


            </section>
        );
    }
}