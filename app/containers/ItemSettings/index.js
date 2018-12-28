/**
 *
 * ItemSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import { Field, reduxForm } from 'redux-form/immutable'

import injectReducer from 'utils/injectReducer';
import makeSelectItemSettings from './selectors';
import reducer from './reducer';
import messages from './messages';


const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)


const SettingsContainer = styled.div`
  position: absolute;
  z-index: 1;
  right: 0px;
  top: ${props => props.top || '0px'};
`;

/* eslint-disable react/prefer-stateless-function */
export class ItemSettings extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <SettingsContainer>
          <Fab color="primary" aria-label="Add">
            <Button onClick={this.handleToggle}>
              <SettingsIcon />
            </Button>
          </Fab>
        </SettingsContainer>
        <SettingsContainer top="50px">
          <Paper style={{display: open ? 'block' : 'none'}}>
          <form onSubmit={console.log}>
            <div>
              <Field name="firstName" component={renderTextField} type="text" label="Vorname" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" component="input" type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="email" />
            </div>
            <button type="submit">Submit</button>
          </form>
            {/* <MenuList>
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </MenuList> */}
          </Paper>
        </SettingsContainer>
      </div>
    );
  }
}

ItemSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,

};

const createReduxForm = reduxForm({ form: 'settings' });

const mapStateToProps = createStructuredSelector({
  itemSettings: makeSelectItemSettings(),
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

const withReducer = injectReducer({ key: 'itemSettings', reducer });

export default createReduxForm(compose(
  withReducer,
  withConnect,
)(ItemSettings));
