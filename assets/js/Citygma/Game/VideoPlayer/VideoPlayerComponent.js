import React, { Component } from 'react'

import ReactPlayer from "react-player";
import { uploadsDir } from "../../ConstData/uploadsDir";


export default class VideoPlayerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: null,
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
            loop: false
        };

        this.handlePlay = this.handlePlay.bind(this);
        this.handleEnded = this.handleEnded.bind(this);

        const {onVideoEnded} = this.props.onVideoEnded;
    }

    componentDidMount() {
        { this.props.videoUrl &&
            this.setState({ url: `${uploadsDir.getUploadsDir()}${this.props.videoUrl}` });
        }
    }

    handlePlay() {
        console.log('onPlay');
        this.setState({ playing: true });
    }

    handleEnded() {
        this.props.onVideoEnded();
    }


    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        return (
            <section className='playerSection'>
                <div>
                    <button className="marronButton" onClick={this.handlePlay}>Lire</button>
                    <button className="marronButton" onClick={this.props.handleBackToGameInterface}>Retour</button>
                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={url}
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
                </div>
            </section>
        );
    }
}