import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends React.Component {

  loadQuestionDetails = (e, questionId) => {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    const {poll, user} = this.props;
    return (
      <Card style={{margin:"20px"}} onClick={(e) => this.loadQuestionDetails(e, poll.id)}>
        <Card.Body>
          <Card.Title>Would You Rather</Card.Title>
          <ul>
            <li className={poll.optionOne.votes.includes(user) ? "selected" : ""} >{poll.optionOne.text}</li>
            <li className={poll.optionTwo.votes.includes(user) ? "selected" : ""} >{poll.optionTwo.text}</li>
          </ul>
        </Card.Body>
      </Card>
    );
  }
}

Question.propTypes = {
  poll: PropTypes.object.isRequired,
};

function mapStateToProps (state, { id }) {
  return {
    poll : state.questions[id],
    user: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
