import React from "react";
import Layout from "./components/Layout";

const App = props => {
  return (
    <div className="wrapper">
      <Layout>{props.children}</Layout>
    </div>
  );
};

export default App;
