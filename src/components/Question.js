import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends React.Component {

  loadQuestionDetails = (e, questionId) => {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    const {question, auth} = this.props;
    return (
      <Card style={{margin:"20px"}} onClick={(e) => this.loadQuestionDetails(e, question.id)}>
        <Card.Body>
          <Card.Title>Would You Rather</Card.Title>
          <ul>
            <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>{question.optionOne.text}</li>
            <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps (state, { id }) {
  return {
    question : state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
