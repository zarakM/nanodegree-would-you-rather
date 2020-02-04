import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, Redirect , withRouter } from "react-router-dom";

import { connect } from "react-redux";

const Appbar = props => {
  const { user, authedUser } = props;
  console.log( props )
  return !authedUser ? (
    <Redirect
      to={{
        pathname: "/login",
        state: { referrer: props.location.pathname }
      }}
    />
  ) : (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Would you rather
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/add">
          {" "}
          Add Poll{" "}
        </Nav.Link>
        <Nav.Link as={Link} to="/leaderboard">
          LeaderBoard
        </Nav.Link>
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
        <Button as={Link} variant="outline-primary" to="/logout">
          Logout
        </Button>
      </Form>
    </Navbar>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser: authedUser,
    user: users[authedUser]
  };
}

export default withRouter(connect(mapStateToProps, null)(Appbar));
