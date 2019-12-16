import React, {Component, Fragment} from 'react'

import ReactPlayer, {player} from "react-player";
import { uploadsDir } from "../../ConstData/uploadsDir";


export default class VideoPlayerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.videoUrl,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,

            player: null,
            showEndedButton: false
        };

        this.load = this.load.bind(this);
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
    }

    load() {
        this.state.player.seekTo(0);
        this.setState({
            playing: true,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlay() {
        console.log('onPlay');
        this.setState({ playing: true });
    }

    handleEnded() {
        this.props.onVideoEnded();
        this.setState({showEndedButton: true});
    }

    ref(player) {
        this.setState({player: player});
    }



    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;

        return (
            <section className='playerSection'>
                <div>
                    <button id="videoPlay" className="marronButton" onClick={this.handlePlay}>Lire</button>
                    {this.state.showEndedButton &&
                        <Fragment>
                            <button className="marronButton" onClick={this.props.handleBackToGameInterface}>Retour</button>
                            <button id="videoRePlay" className="marronButton" onClick={this.load}>Revoir</button>
                        </Fragment>
                    }
                </div>
                <div className='player-wrapper'>
                    <ReactPlayer
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
                </div>
            </section>
        );
    }
}