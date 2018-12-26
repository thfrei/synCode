/**
 *
 * AudioPlayer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import * as _ from 'lodash';
import Sound from 'react-sound';
// soundManager.setup({ ignoreMobileRestrictions: true });

// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class AudioPlayer extends React.Component {
  render() {
    const {play, setTime, offset} = this.props;
    // console.log("Audio", this.props);

    return (
      <div>
        Sound: {this.playStatus(play)}
        Pos: {this.playFromPosition(setTime, offset)}
        <Sound
          url="http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3"
          playStatus={this.playStatus(play)}
          playFromPosition={this.playFromPosition(setTime, offset)}
          autoLoad={true}
          onLoad={console.log}
          onPlaying={console.log}
          volume={90}
        />
      </div>
    );
  }

  playStatus(play) {
    return play ? "PLAYING" : "PAUSED";
  }

  playFromPosition(setTime, offset) {
    return _.toNumber(setTime) + _.toNumber(offset);
  }
}

AudioPlayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  setTime: PropTypes.number,
  item: PropTypes.any,
  offset: PropTypes.number,
};

const mapStateToProps = (state, props) => createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const AudioPlayerC = connect(
  mapStateToProps, 
  mapDispatchToProps
)(AudioPlayer);

export {
  AudioPlayerC as AudioPlayer
}
