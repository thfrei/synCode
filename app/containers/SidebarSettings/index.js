/**
 *
 * SidebarSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectSidebarSettings from './selectors';
import reducer from './reducer';
import messages from './messages';

import Paper from '@material-ui/core/Paper';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Typography } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class SidebarSettings extends React.Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={this.handleSidebarHide}
        vertical
        visible={false}
        width='thin'
      >
        <Paper>
          <Typography variant="body1">
            Sidebar
          </Typography>
        </Paper>
      </Sidebar>
    );
  }
}

SidebarSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sidebarSettings: makeSelectSidebarSettings(),
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

const withReducer = injectReducer({ key: 'sidebarSettings', reducer });

export default compose(
  withReducer,
  withConnect,
)(SidebarSettings);
