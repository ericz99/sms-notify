import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import { registerUser } from "../../actions/authAction";

import InputField from "../../components/Common/InputField";
import ButtonField from "../../components/Common/ButtonField";

import "../../styles/form.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error.error });
    }
  }

  onSubmitHandler = async e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    await this.props.registerUser(newUser, this.props.history);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="container">
        <div className="heading">
          <h1>Register.</h1>
          <div className="heading-bar" />
          <p>Trust in our services!</p>
        </div>
        <Form
          className="form-container"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <InputField
            label="Name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.onChangeHandler(e)}
            required={true}
            error={error.name}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.onChangeHandler(e)}
            required={true}
            error={error.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.onChangeHandler(e)}
            required={true}
            error={error.password}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={e => this.onChangeHandler(e)}
            required={true}
            error={error.confirmPassword}
          />
          <div className="right">
            <Link to="/login">Already got an account?</Link>
          </div>
          <ButtonField
            type="submit"
            className="btn-md btn-block"
            color="primary"
            text="Register"
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
