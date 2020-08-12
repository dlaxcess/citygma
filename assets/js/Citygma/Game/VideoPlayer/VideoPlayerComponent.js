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
            muted: true,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,

            player: {playing: false},
            showEndedButton: false
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

    componentDidUpdate() {
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));

        /*var timeOutID = window.setTimeout( function () {
            if (!this.state.showEndedButton) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
                document.getElementById("videoRePlay").dispatchEvent(evt);
            }
        }, 5000);*/
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

        if (this.state.player.hasStarted) {
            this.setState({playing: true});

            //var timeOutID = window.setTimeout( this.setUnMutedTimedOut(), 2000);
            this.setState({muted: false});
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
        this.props.onVideoEnded();
        this.setState({showEndedButton: true, playing: false});
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

        return (
            /*setTimeout(this.setMuted(false), 1000);*/
            <section className='playerSection'>
                <div id="playerBubulle"></div>
                <div id="playerBackground"></div>
                <div id="videoPlayerButtons">
                    {/*<button id="videoPlay" className="marronButton" onClick={this.handlePlay}>Lire</button>*/}
                    {this.state.showEndedButton && !this.state.playing &&
                        <button className="marronButton" onClick={this.props.handleBackToGameInterface}>Poursuivre</button>
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
                        muted
                        autoPlay
                        webkit-playsinline
                        playsInline
                        ended={this.handleEnded}
                    >
                        <source src={`${uploadsDir.getUploadsDir()}${url}`} type="video/mp4" />
                        <ControlBar autoHide={true} disableCompletely={true} />
                    </Player>
                </div>

                {/*<div className='player-wrapper'>
                    <ReactPlayer
                        autoPlay
                        webkit-playsinline={true}
                        playsinline={true}
                        ref={this.ref}
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={`${uploadsDir.getUploadsDir()}${url}`}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={light}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                    />
                </div>*/}
            </section>
        );
    }
}