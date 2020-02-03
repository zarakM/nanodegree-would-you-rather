import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

const ErrorRoute = ({history}) => {
  return (
      <Jumbotron style={{margin: "100px"}}>
        <h1>404 Error No page found</h1>
        <p>
          <Button variant="primary" onClick={()=> history.push("/") }>Go Back</Button>
        </p>
      </Jumbotron>
  );
};

export default withRouter(ErrorRoute);
