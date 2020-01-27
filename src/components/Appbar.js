import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types'


const Appbar = () => {
  const { user } = this.props;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Would you rather</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#home">Add Poll</Nav.Link>
        <Nav.Link href="#features">LeaderBoard</Nav.Link>
      </Nav>
      <Form inline>
        <img
          src={user.avatarURL}
          className="avatar"
          alt={`Avatar of ${user.name}`}
        />
        <span>{user.name}</span>
        {3 === 2 ? (
          <Button variant="outline-primary">Logout</Button>
        ) : (
          <Button variant="outline-primary">LogIn</Button>
        )}
      </Form>
    </Navbar>
  );
};

Appbar.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  };
}

export default Appbar;
