/**
 *
 * Player
 *
 */

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { Player as VideoReactPlayer, ControlBar } from 'video-react';
import ButtonCore from '@material-ui/core/Button';
import 'video-react/dist/video-react.css'; // import css
import { bind } from 'decko';
import * as _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ItemSettings from '../../containers/ItemSettings';
import * as appActions from '../../containers/App/actions';
import { formatVideoTime } from '../../utils/misc';

const Button = props => (
  <ButtonCore variant="contained" onClick={props.onClick}>
    {props.children}
  </ButtonCore>
);

class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.audio,
      player: {},
      offset: 0,
      settingsOpen: false,

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
    // this.handleStateChange = _.debounce(this.handleStateChange, 300, { maxWait: 600 });
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  // this.props.dispatch(set('masterTime', state.currentTime));
  componentDidMount() {
    // subscribe state change
    this.myRef.current.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state, prevState) {
    const item = this.props.item || {};
    // console.log('hSC', item);
    try {
      this.setState({ player: state });

      if (item.get('master')) {
        this.props.updateMasterTime(state.currentTime);
      }

      if (state.seekingTime !== 0) {
        const currentTime = state.seekingTime - item.get('offset');
        this.props.seekMasterTime(currentTime);
      }

      // paused
      if (state.paused === true && prevState.paused === false) {
        this.props.updGlobalPlay(false); // false = set to pause
      }

      // now playing
      if (state.paused === false && prevState.paused === true) {
        this.props.updGlobalPlay(true); // true = play
      }
    } catch (err) {
      console.log('hSC-err', err);
    }
  }

  componentDidUpdate(prevProps) {
    const item = this.props.item || {};
    const prevItem = prevProps.item || {};

    if (prevProps.play && !this.props.play || !this.pause.play) {
      this.pause();
    }

    if (!prevProps.play && this.props.play) {
      this.play();
    }

    // Set to Time
    if (this.props.setTime !== prevProps.setTime && this.props.setTime) {
      console.log('seek', this.props.setTime);
      this.seek(this.props.setTime + item.get('offset'))();
    }

    // Offset
    if (item.get('offset') !== prevItem.get('offset')) {
      const { player } = this.myRef.current.getState();
      const seekTime = this.props.setTime + item.get('offset') || 0;
      console.log('offset', item.get('offset'), 'seekTime:', seekTime, player);
      this.seek(seekTime)();
    }

    // Source
    if (item.get('source') !== prevItem.get('source')) {
      this.changeSource(item.get('source'))();
      this.seek(this.props.setTime + item.get('offset'))();
    }

    // Mute
    if (item.get('muted') !== prevItem.get('muted')) {
      this.setMuted(item.get('muted'))();
    }

    // Playback
    if (prevProps.playbackRate !== this.props.playbackRate) {
      console.log('change playbackrate', this.props.playbackRate);
      this.setPlaybackRate(this.props.playbackRate);
    }
  }

  render() {
    const { item } = this.props;
    // console.log('render player', item, this.props, this.myRef.current)
    return (
      <div style={{ height: '100%', flexGrow: 1, }}>
        <Typography variant="subtitle1">
          {item.get('master') ? 'MASTER | ' : ''}{item.get('type')}
          | Offset: {item.get('offset')}
          | Time-Offset: {formatVideoTime(_.get(this.state.player, 'currentTime') - item.get('offset'))}
        </Typography>
        <ItemSettings style={{ position: 'absolute' }} item={item} />
        <VideoReactPlayer ref={this.myRef} height="90%" fluid={false} muted>
          <source src={item.get('source')} />
        </VideoReactPlayer>
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

  setPlaybackRate(playbackRate) {
    return () => {
      this.myRef.current.playbackRate = playbackRate;
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

  changeSource(source) {
    return () => {
      this.setState({
        source,
      });
      this.myRef.current.load();
    };
  }
}

PlayerControlExample.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.any,
  item: PropTypes.any,
  updateMasterTime: PropTypes.func,
  seekMasterTime: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    seekMasterTime: (time) => {
      dispatch(appActions.set('masterTime', time));
      dispatch(appActions.syncSetAndMasterTime());
    },
    updateMasterTime: _.debounce((time) => {
      dispatch(appActions.set('masterTime', time));
    }, 200, { maxWait: 500 }),
    updGlobalPlay: (playing) => {
      dispatch(appActions.play(playing));
    }
  };
}

const PlayerControlExampleC = connect(null, mapDispatchToProps)(PlayerControlExample);

export { PlayerControlExampleC as Player };


const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
  audio: 'http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3',
};
