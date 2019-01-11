/**
 *
 * Topbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectTopbar from './selectors';
import reducer from './reducer';
import messages from './messages';

import { Typography, Paper } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class Topbar extends React.Component {
  render() {
    return (
      <div>
        <Paper>
          <Typography variant="h5">
            Topbar
          </Typography>
        </Paper>
      </div>
    );
  }
}

Topbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  topbar: makeSelectTopbar(),
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

const withReducer = injectReducer({ key: 'topbar', reducer });

export default compose(
  withReducer,
  withConnect,
)(Topbar);
