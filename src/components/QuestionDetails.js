import React, { PureComponent, Fragment } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import { handleAnswer } from "../redux/actions/shared";
import PropTypes from "prop-types";
import Appbar from "./Appbar";
import { withRouter, Redirect } from "react-router-dom";

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: ""
  };

  radioSelected = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const {
      question,
      answer,
      total,
      percOne,
      percTwo,
      author,
      authedUser,
      notFound
    } = this.props;
    const { selectedOption } = this.state;

    return authedUser === null ? (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: this.props.location.pathname }
        }}
      />
    ) : (
      <Fragment>
        {notFound ? (
          <Redirect to="/error"/>
        ) : (
          <div>
            <Appbar />
            <Row
              style={{ marginTop: "20px" }}
              className="justify-content-md-center"
            >
              <Col xs lg="6">
                <Card>
                  <Card.Header>
                    <img
                      src={author.avatarURL}
                      className="avatar"
                      alt={`Avatar of ${author.name}`}
                    />
                    <span>{author.name}</span>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Would You Rather</Card.Title>
                    {answer ? (
                      <div>
                        <fieldset>
                          <Form.Group as={Row}>
                            <Col sm={10}>
                              <Form.Check
                                type="radio"
                                checked={answer === "optionOne"}
                                label={question.optionOne.text}
                                disabled
                              />
                              <Form.Check
                                type="radio"
                                checked={answer === "optionTwo"}
                                label={question.optionTwo.text}
                                disabled
                              />
                            </Col>
                          </Form.Group>
                        </fieldset>
                        <ProgressBar>
                          <ProgressBar
                            striped
                            variant="info"
                            label={percOne}
                            now={percOne}
                            key={1}
                          />
                          <ProgressBar
                            striped
                            variant="danger"
                            label={percTwo}
                            now={percTwo}
                            key={2}
                          />
                        </ProgressBar>
                        <div className="total">
                          Total number of votes: {total}
                        </div>
                      </div>
                    ) : (
                      <Form onSubmit={this.handleSubmit}>
                        <fieldset>
                          <Form.Group as={Row}>
                            <Col sm={10}>
                              <Form.Check
                                type="radio"
                                name="radio1"
                                value="optionOne"
                                onChange={this.radioSelected}
                                label={question.optionTwo.text}
                              />
                              <Form.Check
                                type="radio"
                                name="radio1"
                                value="optionTwo"
                                onChange={this.radioSelected}
                                label={question.optionOne.text}
                              />
                            </Col>
                          </Form.Group>
                        </fieldset>
                        {selectedOption === "" ? (
                          <Button disabled>Submit</Button>
                        ) : (
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        )}
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Fragment>
    );
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
  author: PropTypes.object,
  answer: PropTypes.string,
  percOne: PropTypes.string.isRequired,
  percTwo: PropTypes.string.isRequired
};

function convert_to_fixed(number) {
  return Number.parseFloat(number).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match, history }) {
  if (authedUser === null) {
    return {
      authedUser,
      id: "",
      question: {},
      author: {},
      answer: "",
      total: "",
      percOne: "",
      percTwo: ""
    };
  } else {
    const answers = users[authedUser].answers;
    let answer, percOne, percTwo, total;
    const { id } = match.params;
    const question = questions[id];
    let notFound = true;

    Object.keys(questions).map(qid => {
      if (id === qid) {
        notFound = false;
      }
    });

    if (notFound) {
      return {
        notFound,
        authedUser,
        id: "",
        question: {},
        author: {},
        answer: "",
        total: "",
        percOne: "",
        percTwo: ""
      };
    } else {
      if (answers.hasOwnProperty(question.id)) {
        answer = answers[question.id];
      }
      const author = users[question.author];
      total = question.optionOne.votes.length + question.optionTwo.votes.length;
      percOne = convert_to_fixed(
        (question.optionOne.votes.length / total) * 100
      );
      percTwo = convert_to_fixed(
        (question.optionTwo.votes.length / total) * 100
      );
      return {
        id,
        question,
        author,
        answer,
        total,
        percOne,
        percTwo
      };
    }
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: answer => {
      dispatch(handleAnswer(id, answer));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
);
