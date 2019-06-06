import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateSettings,
  fetchSettings,
  clearSettings
} from "../../actions/settingsAction";
import { Form, ButtonGroup } from "reactstrap";
import InputField from "../../components/Common/InputField";
import ButtonField from "../../components/Common/ButtonField";

class Settings extends Component {
  state = {
    controls: {
      twilioPhoneNumber: {
        type: "text",
        label: "Twilio Phone Number",
        name: "twilioPhoneNumber",
        value: ""
      },
      twilioAccountSID: {
        type: "text",
        label: "Twilio Account SID",
        name: "twilioAccountSID",
        value: ""
      },
      twilioAuthToken: {
        type: "text",
        label: "Twilio Auth Token",
        name: "twilioAuthToken",
        value: ""
      },
      phoneNumber: {
        type: "text",
        label: "Phone Number",
        name: "phoneNumber",
        value: ""
      },
      webhook: {
        type: "text",
        label: "Webhook",
        name: "webhook",
        value: ""
      },
      email: {
        type: "text",
        label: "Email",
        name: "email",
        value: ""
      },
      message: {
        type: "textarea",
        label: "Global Message",
        name: "message",
        value: "",
        rows: 5,
        formText: "This is where you gonna send out your messages!"
      }
    },
    error: {}
  };

  async componentDidMount() {
    await this.props.fetchSettings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.config) {
      const { config } = nextProps.settings;
      const { controls } = this.state;
      const currentState = controls;
      for (const key in config) {
        currentState[key].value = config[key];
      }

      this.setState({
        currentState: currentState
      });
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error.error });
    }
  }

  onSubmitHandler = async e => {
    e.preventDefault();

    const { controls } = this.state;
    const newArr = [];
    for (const key in controls) {
      newArr.push({
        [key]: controls[key].value
      });
    }

    const config = Object.assign({}, ...newArr);
    await this.props.updateSettings(config);
    try {
    } catch (e) {
      if (e) console.error(e);
    }
  };

  onChangeHandler = e => {
    const { controls } = this.state;
    const currentState = controls;
    const { name, value } = e.target;
    currentState[name].value = value;
    this.setState({ controls: currentState });
  };

  resetConfig = e => {
    if (e.target) {
      this.props.clearSettings();
    }
  };

  render() {
    const { controls } = this.state;

    const formElementsArray = [];
    for (const key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }

    let renderFormInput = formElementsArray.map((el, index) => (
      <div className="col-sm-4" key={el.id}>
        <InputField
          label={el.config.label}
          type={el.config.type}
          value={el.config.value}
          name={el.config.name}
          onChange={e => this.onChangeHandler(e)}
          rows={el.config.rows}
          formText={el.config.formText}
        />
      </div>
    ));

    return (
      <div className="container">
        <div className="heading">
          <h1>Settings.</h1>
          <div className="heading-bar" />
          <p>Configurate your settings!</p>
        </div>

        <Form className="form" onSubmit={e => this.onSubmitHandler(e)}>
          <div className="form-row">
            {renderFormInput}{" "}
            <div className="col-sm-12">
              <ButtonGroup className="btnGroup">
                <ButtonField
                  type="submit"
                  className="btn-md"
                  color="success"
                  text="Save Changes"
                />{" "}
                <ButtonField
                  type="button"
                  className="btn-md"
                  color="danger"
                  text="Reset Settings"
                  onClick={e => this.resetConfig(e)}
                />
              </ButtonGroup>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

Settings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  fetchSettings: PropTypes.func.isRequired,
  clearSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired || PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  alert: state.alert,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { updateSettings, fetchSettings, clearSettings }
)(Settings);
