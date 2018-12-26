/**
 *
 * Player
 *
 */

import PropTypes from 'prop-types';
// import styled from 'styled-components';

import React, { Component } from 'react';
import { Player as VideoReactPlayer, ControlBar } from 'video-react';
import ButtonCore from '@material-ui/core/Button';
import 'video-react/dist/video-react.css'; // import css

const Button = props => (
  <ButtonCore variant="contained" onClick={props.onClick}>
    {props.children}
  </ButtonCore>
);

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
  audio: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
};

class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunnyMovie,
      player: {},
      offset: 0,
    };

    this.myRef = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    // this.myRef.current.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    // this.setState({
    //   player: state,
    // });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.play && !this.props.play) {
      this.pause();
    }

    if (!prevProps.play && this.props.play) {
      this.play();
    }

    if (this.props.setTime !== prevProps.setTime && this.props.setTime) {
      console.log('seek', this.props.setTime);
      this.seek(this.props.setTime)();
    }

    if (this.props.offset !== prevProps.offset && this.props.offset) {
      const { player } = this.myRef.current.getState();
      const currentTime = player.currentTime;
      this.seek(currentTime + this.props.offset - prevProps.offset || 0)();
    }
  }

  render() {
    const { item } = this.props;
    // console.log(this.props, this.myRef.current)
    return (
      <div style={{ height: '100%' }}>
        <VideoReactPlayer ref={this.myRef} height="90%" fluid={false} muted>
          <source src={this.state.source} />
        </VideoReactPlayer>
        {/* <Button onClick={this.seek(50)} className="mr-3">currentTime = 50</Button>
        <Button onClick={() => this.props.updateOffset(item.get('id'), 1)} className="mr-3">+1s</Button> */}
        {/* <div className="py-3">
          <Button onClick={this.play} className="mr-3">play()</Button>
          <Button onClick={this.pause} className="mr-3">pause()</Button>
          <Button onClick={this.load} className="mr-3">load()</Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeCurrentTime(10)} className="mr-3">currentTime += 10</Button>
          <Button onClick={this.changeCurrentTime(-10)} className="mr-3">currentTime -= 10</Button>
          <Button onClick={this.seek(50)} className="mr-3">currentTime = 50</Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changePlaybackRateRate(1)} className="mr-3">playbackRate++</Button>
          <Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">playbackRate--</Button>
          <Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">playbackRate+=0.1</Button>
          <Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">playbackRate-=0.1</Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeVolume(0.1)} className="mr-3">volume+=0.1</Button>
          <Button onClick={this.changeVolume(-0.1)} className="mr-3">volume-=0.1</Button>
          <Button onClick={this.setMuted(true)} className="mr-3">muted=true</Button>
          <Button onClick={this.setMuted(false)} className="mr-3">muted=false</Button>
        </div>
        <div className="pb-3">
          <Button onClick={this.changeSource('sintelTrailer')} className="mr-3">Sintel teaser</Button>
          <Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">Bunny trailer</Button>
          <Button onClick={this.changeSource('bunnyMovie')} className="mr-3">Bunny movie</Button>
          <Button onClick={this.changeSource('test')} className="mr-3">Test movie</Button>
        </div> */}
        {/* <div>State</div>
        <pre>
          {JSON.stringify(this.state.player, null, 2)}
        </pre> */}
      </div>
    );
  }

  play() {
    this.myRef.current.play();
  }

  pause() {
    this.myRef.current.pause();
  }

  load() {
    this.myRef.current.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.myRef.current.getState();
      const currentTime = player.currentTime;
      this.myRef.current.seek(currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.myRef.current.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.myRef.current.getState();
      const playbackRate = player.playbackRate;
      this.myRef.current.playbackRate = playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.myRef.current.getState();
      const volume = player.volume;
      this.myRef.current.volume = volume + steps;
    };
  }

  setMuted(muted) {
    return () => {
      this.myRef.current.muted = muted;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name],
      });
      this.myRef.current.load();
    };
  }
}

PlayerControlExample.propTypes = {};

export { PlayerControlExample as Player };
