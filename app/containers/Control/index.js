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
import { play, setTime, syncSetAndMasterTime, masterTimeMinus } from '../App/actions';
import { selectGlobalMasterTime } from '../App/selectors';
import { formatVideoTime, insertAtCaret } from '../../utils/misc';
import { GLOBAL_EDITOR_ID } from '../Editor/constants';
import { Modal, Table, Header } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class Control extends React.Component {
  render() {
    return (
      <div>
        <Typography variant={"h5"}>
          Master: {formatVideoTime(this.props.masterTime)}
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

        <Modal trigger={<Button variant="contained">?</Button>}>
          <Paper>
            <Modal.Header><Typography variant='h4'>Help</Typography></Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                  <Typography variant={"h6"}>
                  <textarea 
          style={{
            width: '100%',
            height: '100%',
            minHeight: '300px',
            border: '1px solid black',
          }}>
      'play': 'alt+p',
      'minus2': 'alt+h',
      'plus2': 'alt+l',
      'insertTime': 'alt+j',
      'sync': 'alt+s',
      </textarea>
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
