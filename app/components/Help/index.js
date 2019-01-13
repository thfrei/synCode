/**
 *
 * Help
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Typography, Paper } from '@material-ui/core';

function Help() {
  return (
    <Paper>
      <Typography variant={"h1"}>
        Hilfe
      </Typography>
      <Typography variant={"body1"}>
      
      </Typography>
    </Paper>
  );
}

Help.propTypes = {};

export default Help;
