import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Question from "./Question";

const DashBoard = props => {
  const { unanswered, answered } = props;

  return (
    <div>
      <Tabs style={{ marginTop: "40px", marginLeft: "20px" }} id="answer_tab">
        <Tab eventKey="Unanswered" title="Unanswered">
          <Row>
            {unanswered.map(qid => (
              <Col key={qid} sm={"6"} md={"4"}>
                <Question id={qid} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="Answered" title="Answered">
          <Row>
            {answered.map(qid => (
              <Col key={qid} sm={"6"} md={"4"}>
                <Question id={qid} />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

DashBoard.propTypes = {
  answered: PropTypes.array,
  unanswered: PropTypes.array
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answered = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unanswered = Object.keys(questions)
    .filter(qid => !answered.includes(qid))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    unanswered,
    answered
  };
}

export default connect(mapStateToProps)(DashBoard);
