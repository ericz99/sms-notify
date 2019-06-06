import React, { Component } from "react";

import Card from "../../components/Common/CardComponent";

export default class Dashboard extends Component {
  state = {
    data: {
      usage: {
        title: "Usages",
        header: "Total Usages",
        text: "0"
      },
      balance: {
        title: "Balance",
        header: "Total Balance",
        text: "$100"
      },
      users: {
        title: "Users",
        header: "Total Users",
        text: "100"
      }
    }
  };

  render() {
    const { data } = this.state;

    const dataArr = [];
    for (const key in data) {
      dataArr.push({
        id: key,
        value: data[key]
      });
    }

    const renderData = dataArr.map(d => (
      <Card
        key={d.id}
        title={d.value.title}
        text={d.value.text}
        header={d.value.header}
        body
        className="text-center"
        outline
        color="info"
      />
    ));

    return (
      <div className="container">
        <div className="heading">
          <h1>Dashboard.</h1>
          <div className="heading-bar" />
          <p>
            This is where all your analytics, and where you will keep track of
            all your recent usage!
          </p>
        </div>
        <hr />
        <div className="card-container">
          <div className="row">{renderData}</div>
        </div>
      </div>
    );
  }
}
