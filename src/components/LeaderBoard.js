import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const Leaderboard = props => {
  const { users } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Profile</th>
          <th>User</th>
          <th>Question Asked</th>
          <th>Question Answered</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index}</td>
            <td>
              <img
                src={user.avatarURL}
                className="avatar"
                alt={"Avatar of " + user.name}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.questions.length}</td>
            <td>{Object.keys(user.answers).length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ users, authedUser }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    authedUser: authedUser,
    users: Object.values(users).sort(
      (first, second) => userScore(second) - userScore(first)
    )
  };
};

export default connect(mapStateToProps)(Leaderboard);
