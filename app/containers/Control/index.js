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
import { saveState, loadState } from '../Grid/actions';

/* eslint-disable react/prefer-stateless-function */
class Control extends React.Component {
  render() {
    return (
      <div>
        <Typography variant={"h5"}>
          Master: {formatVideoTime(this.props.masterTime)}
          | PlaybackRate: {Math.round(this.props.playbackRate*100)}%
        </Typography>
        <Button variant="contained" onClick={() => this.props.dispatch(play(true))}>Play</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(play(false))}>||</Button>
        {/* <Button variant="contained" onClick={() => this.props.dispatch(setTime(40))}>40</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(setTime(10))}>10</Button> */}
        <Button variant="contained" onClick={() => this.props.dispatch(syncSetAndMasterTime())}>Sync</Button>
        <Button variant="contained" onClick={() => insertAtCaret(GLOBAL_EDITOR_ID, formatVideoTime(this.props.masterTime, false))}>h:mm:ss</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(5))}>Master -5s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(10))}>Master -10s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(20))}>Master -20s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(add('playbackRate', 0.1))}>++</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(add('playbackRate', -0.1))}>--</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(saveState())}>SAVE</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(loadState())}>LOAD</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(updateItem(1, 'muted', false))}>1</Button>        
        
        <Modal trigger={<Button variant="contained">Videos</Button>}>
          <Paper>
            <Modal.Header><Typography variant='h4'>Help</Typography></Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Typography variant={"body1"}>
                  'play': 'alt+p', <br />
                  'minus2': 'alt+h',<br />
                  'plus2': 'alt+l',<br />
                  'insertTime': 'alt+j',<br />
                  'sync': 'alt+s',<br />
                </Typography>
              </Modal.Description>
            </Modal.Content>
          </Paper>
        </Modal>

        <Modal trigger={<Button variant="contained">?</Button>}>
          <Paper>
            <Modal.Header><Typography variant='h4'>Help</Typography></Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Typography variant={"body1"}>
                  'play': 'alt+p', <br />
                  'minus2': 'alt+h',<br />
                  'plus2': 'alt+l',<br />
                  'insertTime': 'alt+j',<br />
                  'sync': 'alt+s',<br />
                </Typography>
              </Modal.Description>
            </Modal.Content>
          </Paper>
        </Modal>
      </div>
    );
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
