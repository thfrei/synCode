/**
 *
 * Editor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectEditor from './selectors';
import reducer from './reducer';
import { selectGlobalText } from '../App/selectors';
import { updateText } from '../App/actions';
import { Form, TextArea } from 'semantic-ui-react';
import { GLOBAL_EDITOR_ID } from './constants';
import { Typography } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class Editor extends React.Component {
  render() {
    return (
      <Form>
        <Typography variant={"h6"}>
        <TextArea
          style={{
            width: '100%',
            height: '100%',
            minHeight: '300px',
          }}
          onChange={this.props.update}
          value={this.props.text}
          id={GLOBAL_EDITOR_ID}
        />
        </Typography>
      </Form>
    );
  }
}

Editor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  update: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  text: selectGlobalText,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    update: (e) => {
      e.preventDefault();
      dispatch(updateText(e.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editor', reducer });

export default compose(
  withReducer,
  withConnect,
)(Editor);
