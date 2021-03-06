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
import * as _ from 'lodash';

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

import injectReducer from 'utils/injectReducer';
import makeSelectItemSettings from './selectors';
import reducer from './reducer';
import messages from './messages';
import SettingsForm from '../../components/SettingsForm';
import { updateItem } from '../Grid/actions';
import { bind } from 'decko';

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

  /**
   * 
   * @var values {Immutable.Map}
   */
  handleSubmit = values => {
    const { item } = this.props;

    console.log('itemsettings handlesubmit', values);
    if (values) {
      const url = values.get('url');
      const offset = values.get('offset') || 0;

      this.props.dispatch(updateItem(item.get('id'), 'source', url));
      this.props.dispatch(updateItem(item.get('id'), 'offset', _.toNumber(offset)));
    }
  };

  render() {
    const { open } = this.state;
    const { item } = this.props;

    return (
      <div>
        <SettingsContainer>
          <Fab color="primary" aria-label="Add">
            <Button onClick={this.handleToggle} onDoubleClick={this.toggleStatic}>
              <SettingsIcon />
            </Button>
          </Fab>
        </SettingsContainer>
        <SettingsContainer top="50px">
          <Paper style={{ display: open ? 'block' : 'none' }}>
            <SettingsForm
              onSubmit={this.handleSubmit}
              name={`settingsItem${item.get('id')}`}
              url={item.get('source')}
              offset={item.get('offset')}
            />
          </Paper>
        </SettingsContainer>
      </div>
    );
  }
  
  toggleStatic = (event) => {
    const {item} = this.props;
    console.log('tS', item);
    // disable due to static true performanc eisue
    // this.props.dispatch(updateItem(item.get('id'), 'static', !item.get('static')));
  }
}

ItemSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.any,
};

// const createReduxForm = reduxForm({ form: 'settings' });

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

export default compose(
  withReducer,
  withConnect,
)(ItemSettings);
