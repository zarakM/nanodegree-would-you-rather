import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { unsetAuthedUser } from '../redux/actions/authedUser'

import { connect } from "react-redux";

const Appbar = props => {
  const { user } = props;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Would you rather</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Add Poll</Nav.Link>
        <Nav.Link href="#features">LeaderBoard</Nav.Link>
      </Nav>
      <Form inline>
        <img
          src={user.avatarURL}
          className="avatar"
          alt={`Avatar of ${user.name}`}
        />
        <span style={{ width: "100px", padding: "10px", color: "grey" }}>
          {user.name}
        </span>
        <Button variant="outline-primary" onClick={()=>{props.dispatch(unsetAuthedUser()) }}>Logout</Button>
      </Form>
    </Navbar>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser]
  };
}

export default connect(mapStateToProps, null)(Appbar);
