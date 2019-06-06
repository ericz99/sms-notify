import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

export default function CardComponent({ title, text, header, ...rest }) {
  return (
    <div className="col-sm-4">
      <Card {...rest}>
        <CardBody>
          <CardTitle tag="h1" style={{ fontWeight: 900, letterSpacing: "2px" }}>
            {title}
          </CardTitle>
          <hr />
          <CardText tag="h3">{text}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
