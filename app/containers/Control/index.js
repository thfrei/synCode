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
import { Button, Typography } from '@material-ui/core';
import makeSelectControl from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { play, setTime, syncSetAndMasterTime, masterTimeMinus } from '../App/actions';
import { selectGlobalMasterTime } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
class Control extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="body1">
          Master: {this.props.masterTime}
        </Typography>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(play(true))}>P</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(play(false))}>||</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(setTime(40))}>40</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(setTime(10))}>10</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(syncSetAndMasterTime())}>Sync</Button>
        <br />
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(5))}>Master -5s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(10))}>Master -10s</Button>
        <Button variant="contained" onClick={() => this.props.dispatch(masterTimeMinus(20))}>Master -20s</Button>
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
