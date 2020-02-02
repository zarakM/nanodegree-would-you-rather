import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { withRouter } from "react-router-dom";

const ErrorRoute = ({history}) => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Would You Rather</Navbar.Brand>
      </Navbar>
      
      <Jumbotron style={{margin: "100px"}}>
        <h1>404 Error No page found</h1>
        <p>
          <Button variant="primary" onClick={()=> history.push("/") }>Go Back</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default withRouter(ErrorRoute);
