/**
 *
 * SettingsForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Field, reduxForm, Form } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    variant={"outlined"}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

/* eslint-disable react/prefer-stateless-function */
class SettingsForm extends React.Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          <Field name="url" component={renderTextField} type="text" label="URL" />
          <Field name="offset" component={renderTextField} type="text" label="Offset" />
          <Button variant={"contained"} type="submit">Apply</Button>
        </Form>
      </div>
    );
  }
}

SettingsForm.propTypes = {};

// will read prop-values provided by mapStateToProps
// const SettingsReduxForm = reduxForm({})

// const SettingsFormHOC = reduxForm({
//   form: props.form,
// })

export default class ReduxSettingsForm extends React.Component {
  componentWillMount() {
    this.RForm = reduxForm({
      form: this.props.name
    })(SettingsForm);
  }

  render() {
    const RForm = this.RForm;
    return (
      <RForm {...this.props} />
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     form: ownProps.name || 'fdsa',
//   }
// }

// export default compose(
//   connect(mapStateToProps),
//   (state, props) => reduxForm({
//     form: props.form,
//   }),
// )(SettingsForm);

// const createdReduxForm = reduxForm({form: 'parameter'});
// console.log(createdReduxForm);
// const compReduxForm = createdReduxForm(SettingsForm);
// console.log(compReduxForm);

// const connected = connect(mapStateToProps)(compReduxForm.wrappedInstance);

// export default connected;

// export default reduxForm({
//   form: 'oli',
// })(SettingsForm);

// Itemsettings
//   ReduxSettingsForm(name: 'asdf')
//      SettingsForm