/**
 *
 * Control
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as _ from 'lodash';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Typography, Paper } from '@material-ui/core';
import makeSelectControl from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { play, setTime, syncSetAndMasterTime, masterTimeMinus, add } from '../App/actions';
import { selectGlobalMasterTime, selectGlobalPlaybackRate } from '../App/selectors';
import { formatVideoTime, insertAtCaret } from '../../utils/misc';
import { GLOBAL_EDITOR_ID } from '../Editor/constants';
import { Modal, Table, Header } from 'semantic-ui-react';
import { saveState, loadState, muteItem, updateItem } from '../Grid/actions';

/* eslint-disable react/prefer-stateless-function */
class Control extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minus: 2,
    }
  }

  render() {
    return (
      <div>
        <Typography variant={"h5"}>
          Master: {formatVideoTime(this.props.masterTime)}
          | PlaybackRate: {Math.round(this.props.playbackRate*100)}%
        </Typography>
        <Button variant="contained" onClick={() => this.props.dispatch(play(true))}>Play (p)</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(play(false))}>||</Button>
        {/* <Button variant="contained" onClick={() => this.props.dispatch(setTime(40))}>40</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(setTime(10))}>10</Button> */}
        <Button variant="contained" onClick={() => this.props.dispatch(syncSetAndMasterTime())}>Sync</Button>
        <Button variant="contained" onClick={() => insertAtCaret(GLOBAL_EDITOR_ID, formatVideoTime(this.props.masterTime, false))}>h:mm:ss</Button>
        X: <input type="text" value={this.state.minus} onChange={(e) => {e.preventDefault(); this.setState({minus: e.target.value});}} style={{color: 'white', width: '30px'}}/>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(this.state.minus))}>-x s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(saveState())}>SAVE</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(loadState())}>LOAD</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(1))}>-1s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(2))}>-2s (h)</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(5))}>-5s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(10))}>-10s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(20))}>-20s</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(-1))}>+1s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(-2))}>+2s (l)</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(-5))}>+5s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(-10))}>+10s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(-20))}>+20s</Button>
        
        <Typography variant={"body1"}>
          Playback:
          <Button variant="contained" onClick={() => this.props.dispatch(add('playbackRate', 0.5))}>++50%</Button>
          <Button variant="contained" onClick={() => this.props.dispatch(add('playbackRate', -0.5))}>--50%</Button>
        </Typography>
        
        <Typography variant={"body1"}>
          Toggle Sound: 
          <Button variant="contained" onClick={this.toggleSound(1)}>V1 (1)</Button>
          <Button variant="contained" onClick={this.toggleSound(2)}>V2 (2)</Button>
          <Button variant="contained" onClick={this.toggleSound(3)}>V3 (3)</Button>
          <Button variant="contained" onClick={this.toggleSound(4)}>A2 (4)</Button>
          <Button variant="contained" onClick={this.toggleSound(5)}>A5 (5)</Button>
        </Typography>  
        {/* <Modal trigger={<Button variant="contained">Videos</Button>}>
          <Paper>
            <Modal.Header><Typography variant='h4'>Help</Typography></Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Typography variant={"body1"}>
                  -
                </Typography>
              </Modal.Description>
            </Modal.Content>
          </Paper>
        </Modal> */}

        <Modal trigger={<Button variant="contained">?</Button>}>
          <Paper>
            <Modal.Header><Typography variant='h4'>Help</Typography></Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Typography variant={"body1"}>
                  Play: p
                  'minus2': 'h',<br />
                  'plus2': 'l',<br />
                  'sync': 'alt+s',<br />
                </Typography>
                
                <Typography variant={"body1"}>
                  Die Videos und Audidateien müssen folgende Namen tragen: V1.mp4, V2.mp4, V3.mp4, A2.mp3, A5.mp3
                </Typography>
              </Modal.Description>
            </Modal.Content>
          </Paper>
        </Modal>
        
        <Typography variant={"body1"}>
          Kurzanleitung: Taste "p" (Play), "1"-"5" um Videos und Sound an/auszuschalten, "h"/"l" -2/+2s
        </Typography>
      </div>
    );
  }

  toggleSound = (id) => {
    return () => {
      this.props.dispatch(updateItem(id, 'muted', undefined, true));
    }
  }
 
}

Control.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  control: makeSelectControl(),
  masterTime: selectGlobalMasterTime,
  playbackRate: selectGlobalPlaybackRate,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'control', reducer });
const withSaga = injectSaga({ key: 'control', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Control);
