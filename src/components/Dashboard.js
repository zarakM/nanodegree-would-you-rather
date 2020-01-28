import React, { PureComponent } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Question from './Question';

class DashBoard extends PureComponent {
  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    return (
      <div>
        <Tabs
          style={{ marginTop: "40px", marginLeft: "80px" }}
          defaultActiveKey="Unanswered"
          id="answer_tab"
        >
          <Tab eventKey="Unanswered" title="Unanswered">
            {unansweredQuestions.map(qid => (
              <Col key={qid} sm="6" md="4">
                <Question id={qid} />
              </Col>
            ))}
          </Tab>
          <Tab eventKey="Answered" title="Answered">
            {answeredQuestions.map(qid => (
              <Col key={qid} sm="6" md="4">
                <Question id={qid} />
              </Col>
            ))}
          </Tab>
        </Tabs>



        {/* <Nav tabs>
          <NavItem>
            <NavLink
              className={{ active: this.state.activeTab === '1' }}
              onClick={() => { this.toggle('1'); }}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: this.state.activeTab === '2' }}
              onClick={() => { this.toggle('2'); }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {unansweredQuestions.map(qid =>
                <Col key={qid} sm="6" md="4">
                   <Question id={qid}/> 
                </Col>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {answeredQuestions.map(qid =>
                <Col key={qid} sm="6" md="4">
                   <Question id={qid}/> 
                </Col>
              )}
            </Row>
          </TabPane>
        </TabContent> */}
      </div>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  };
}

export default connect(mapStateToProps)(DashBoard);
