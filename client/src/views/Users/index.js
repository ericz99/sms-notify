import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createUser,
  getAllUsers,
  deleteUser,
  sendGlobalMessage
} from "../../actions/userAction";
import {
  Form,
  FormGroup,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import InputField from "../../components/Common/InputField";
import ButtonField from "../../components/Common/ButtonField";
import genUID from "../../utils/genUID";
import PaginationList from "../../components/Common/PaginationList";

import "../../styles/style.css";

class Users extends Component {
  state = {
    modal: false,
    visible: true,
    controls: {
      bulk: {
        type: "textarea",
        label: "Bulk User Creator",
        name: "bulk",
        value: "",
        placeholder: "name:phonenumber\nname:phonenumber",
        formText:
          "This is where you can bulk add infinite amount of users at once!",
        rows: 6
      }
    },
    btnControl: {
      createUser: {
        type: "button",
        className: "btn-md",
        color: "success",
        text: "Create User"
      },
      sendMessage: {
        type: "button",
        className: "btn-md",
        color: "primary",
        name: "sendMessage",
        text: "Send Message"
      }
    },
    users: [],
    alert: {},
    error: {},
    currentPage: 1,
    userPerPage: 5,
    filterStr: ""
  };

  async componentDidMount() {
    await this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ users: nextProps.user.users });
    }

    if (nextProps.alert) {
      this.setState({ alert: nextProps.alert });
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error.error });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const arr = [];
      const newArr = [];
      const { controls } = this.state;
      for (const key in controls) {
        if (controls[key].value !== "") {
          arr.push({
            [key]: controls[key].value
          });
        }
      }

      const userData = Object.assign({}, ...arr);
      const splitData = userData.bulk.split("\n");
      for (let i = 0; i < splitData.length; i++) {
        const splitValue = splitData[i].split(":");
        newArr.push({
          admin: this.props.auth.user._id,
          uid: genUID(),
          name: splitValue[0],
          phoneNumber: splitValue[1]
        });
      }

      await this.props.createUser(newArr);
      this.setState({ modal: false });
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

  onDeleteHandler = (e, id, currentUsers, pageNumbers) => {
    if (e.target) {
      this.props.deleteUser(id);
      if (currentUsers.length - 1 === 0) {
        let oldPage = this.state.currentPage; // 1
        let newPage = pageNumbers[oldPage - 1] - 1;
        this.setState({
          currentPage: newPage
        });
      }
    }
  };

  sendMessage = e => {
    if (e.target) {
      this.props.sendGlobalMessage();
    }
  };

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const { users, currentPage, userPerPage } = this.state;
    const { isLoading } = this.props.user;

    let renderAlert;

    if (Object.keys(alert).length !== 0) {
      renderAlert = (
        <Alert
          color="success"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
          fade={true}
        >
          {alert}
        </Alert>
      );
    }

    // Logic for displaying table
    const indexOfLastTodo = currentPage * userPerPage;
    const indexOfFirstTodo = indexOfLastTodo - userPerPage;
    const currentUsers = users.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / userPerPage); i++) {
      pageNumbers.push(i);
    }

    let renderPagination = pageNumbers.map(
      number =>
        number && (
          <PaginationItem
            key={number}
            active={pageNumbers[currentPage - 1] === number ? true : false}
          >
            <PaginationLink id={number} onClick={this.handleClick.bind(this)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        )
    );

    let renderUserTable = isLoading ? (
      <div>loading...</div>
    ) : (
      users && (
        <Table bordered responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(u => (
              <tr key={u._id}>
                <th scope="row">{u._id}</th>
                <td>{u.name}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.date}</td>
                <td>
                  <ButtonField
                    color="danger"
                    type="button"
                    text="Delete"
                    onClick={e =>
                      this.onDeleteHandler(e, u._id, currentUsers, pageNumbers)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    );

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let formInput = formElementsArray.map(el => (
      <InputField
        key={el.id}
        label={el.config.label}
        type={el.config.type}
        name={el.config.name}
        onChange={e => this.onChangeHandler(e)}
        placeholder={el.config.placeholder}
        formText={el.config.formText}
        rows={el.config.rows}
        error={this.state.error}
      />
    ));

    const btnControlsArr = [];
    for (let key in this.state.btnControl) {
      btnControlsArr.push({
        id: key,
        config: this.state.btnControl[key]
      });
    }

    let renderBtnControl = btnControlsArr.map(el => (
      <ButtonField
        key={el.id}
        type={el.config.type}
        color={el.config.color}
        text={el.config.text}
        onClick={
          el.id === "sendMessage" ? e => this.sendMessage(e) : this.toggle
        }
      />
    ));

    return (
      <div className="container">
        <div className="heading">
          {renderAlert}
          <h1>Users.</h1>
          <div className="heading-bar" />
          <p>Here's all the list of users!</p>
        </div>

        <div className="row">
          <div className="col-md">
            <FormGroup>{renderBtnControl}</FormGroup>
          </div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            centered={true}
          >
            <ModalHeader toggle={this.toggle}>Create User</ModalHeader>
            <Form onSubmit={e => this.onSubmitHandler(e)}>
              <ModalBody>
                <div className="form-row">
                  <div className="col-sm">{formInput}</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <ButtonField color="primary" type="submit" text="Create" />
                <ButtonField
                  type="button"
                  color="secondary"
                  text="Cancel"
                  onClick={this.toggle}
                />
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <hr />
        {renderUserTable}
        <PaginationList>{renderPagination}</PaginationList>
      </div>
    );
  }
}

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  sendGlobalMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  alert: state.alert,
  error: state.error
});

export default connect(
  mapStateToProps,
  { createUser, getAllUsers, deleteUser, sendGlobalMessage }
)(Users);
