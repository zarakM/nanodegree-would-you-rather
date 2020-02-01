import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card, Col, Form, Input, Label, Row } from "react-bootstrap";
import { handleAddQuestion } from "../redux/actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    redirect: false
  };

  handleOptionOneChange = event => {
    event.preventDefault();
    this.setState({
      optionOne: event.target.value
    });
  };

  handleOptionTwoChange = event => {
    event.preventDefault();
    this.setState({
      optionTwo: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Row style={{ marginTop: "20px" }} className="justify-content-md-center">
        <Col xs lg="6">
          <Card>
            <Card.Body>
              <Card.Title>Would You Rather</Card.Title>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Option One</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Option One"
                    value={optionOne}
                    onChange={this.handleOptionOneChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Option One</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Option Two"
                    value={optionTwo}
                    onChange={this.handleOptionTwoChange}
                  />
                </Form.Group>
                <Button type="submit" disabled={optionOne === "" || optionTwo === ""}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

NewQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  };
}

export default connect(null, mapDispatchToProps)(NewQuestion);
