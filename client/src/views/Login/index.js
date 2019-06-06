import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import { Link } from "react-router-dom";
import { Form, Alert } from "reactstrap";

import InputField from "../../components/Common/InputField";
import ButtonField from "../../components/Common/ButtonField";

import "../../styles/form.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: {},
    visible: true
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error.error });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onSubmitHandler = async e => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };

    await this.props.loginUser(data);
  };

  render() {
    const { error } = this.state;
    const { alert } = this.props;
    let renderAlert;

    if (Object.keys(alert).length !== 0) {
      renderAlert = (
        <Alert
          color="success"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          fade={true}
        >
          {alert.msg}
        </Alert>
      );
    }

    return (
      <div className="container">
        <div className="heading">
          <h1>Login.</h1>
          <div className="heading-bar" />
          <p>Keeping your password secure is our top priority!</p>
        </div>

        <Form
          className="form-container"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <InputField
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.onChangeHandler(e)}
            formText="We'll never share your email with anyone else."
            error={error ? error.email : null}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.onChangeHandler(e)}
            error={error ? error.password : null}
          />
          <div className="right">
            <Link to="/register">Need an account?</Link>
          </div>
          <ButtonField
            type="submit"
            className="btn-md btn-block"
            color="primary"
            text="Login"
          />
        </Form>
        <div className="alertMessage">{renderAlert}</div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
