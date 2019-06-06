import React, { Fragment } from "react";
import ToolBar from "./ToolBar";

const Layout = props => {
  return (
    <Fragment>
      <ToolBar />
      {props.children}
    </Fragment>
  );
};

export default Layout;
