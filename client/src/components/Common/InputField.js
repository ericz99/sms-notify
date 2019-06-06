import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Input, FormGroup, Label, FormFeedback, FormText } from "reactstrap";

export default function InputField({ error, formText, label, ...rest }) {
  return (
    <FormGroup>
      {label && <Label>{label}</Label>}

      {error ? (
        <Fragment>
          <Input {...rest} invalid />
          <FormFeedback>{error}</FormFeedback>
        </Fragment>
      ) : (
        <Input {...rest} />
      )}

      <FormText color="muted">{formText}</FormText>
    </FormGroup>
  );
}

InputField.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};
