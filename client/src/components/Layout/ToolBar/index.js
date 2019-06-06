import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authAction";
import store from "../../../store";

class ToolBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onClickHandler = e => {
    if (e.target) {
      // log out user
      store.dispatch(logoutUser());
    }
  };

  render() {
    const { auth } = this.props;
    let authPath;

    if (auth.isAuthenticated) {
      authPath = (
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
          <span className="navbar-brand mb-0 h1">Your Group Name</span>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/dashboard">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link to="/users">Users</Link>
              </NavItem>
              <NavItem>
                <Link to="/settings">Settings</Link>
              </NavItem>
              <NavItem>
                <Link to="/logout" onClick={e => this.onClickHandler(e)}>
                  Logout
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      );
    } else {
      authPath = (
        <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
          <span className="navbar-brand mb-0 h1">Your Group Name</span>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/register">Register</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      );
    }

    return <Fragment>{authPath}</Fragment>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToolBar);
