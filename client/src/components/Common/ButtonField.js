import React, { Fragment } from "react";
import { Button } from "reactstrap";

export default function ButtonField({ text, onClick, ...rest }) {
  return (
    <Fragment>
      <Button {...rest} onClick={onClick}>
        {text}
      </Button>{" "}
    </Fragment>
  );
}
