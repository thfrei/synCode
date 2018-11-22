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
import { Button } from '@material-ui/core';
import makeSelectControl from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { play, setTime } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
class Control extends React.Component {
  render() {
    console.log('hi');
    return (
      <div>
        <Button onClick={() => this.props.dispatch(play(true))}>P</Button>
        <Button onClick={() => this.props.dispatch(play(false))}>||</Button>
        <Button onClick={() => this.props.dispatch(setTime(40))}>40</Button>
        <Button onClick={() => this.props.dispatch(setTime(10))}>10</Button>
      </div>
    );
  }
}

Control.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  control: makeSelectControl(),
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
