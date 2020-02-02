import React from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAuthedUser } from "../redux/actions/authedUser";

const divStyle = {
  display: "flex",
  justifyContent: "center",
  height: "300px",
  alignItems: "center"
};

const Login = props => {
  const handleSubmit = event => {
    event.preventDefault();
    let form_id = event.target.user_id.value;
    const { users } = props;
    let id;

    Object.keys(users).map(i => {
      users[i].name === form_id ? (id = users[i].id) : (id = id);
    });

    const { authenticate } = props;
    authenticate(id);
  };

  const { users } = props;
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Would you rather</Navbar.Brand>
      </Navbar>

      <div style={divStyle}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select User</Form.Label>

            <Form.Control id="user_id" as="select">
              <option disabled value="">
                Please Select
              </option>
              {Object.keys(users).map(user => (
                <option id="user_id" key={user} value={user.id}>
                  {users[user].name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

// class Login extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//     let form_id = event.target.user_id.value;
//     const { users } = this.props;
//     let id;

//     Object.keys(users).map(i => {
//       users[i].name === form_id ? (id = users[i].id) : (id = id);
//     });

//     const { authenticate } = this.props;
//     authenticate(id);
//   };

//   render() {
//     const { users } = this.props;
//     return (
//       <div>
//         <Navbar bg="light" expand="lg">
//           <Navbar.Brand href="#home">Would you rather</Navbar.Brand>
//         </Navbar>

//         <div style={divStyle}>
//           <Form onSubmit={this.handleSubmit}>
//             <Form.Group>
//               <Form.Label>Select User</Form.Label>

//               <Form.Control id="user_id" as="select">
//                 <option disabled value="">
//                   Please Select
//                 </option>
//                 {Object.keys(users).map(user => (
//                   <option id="user_id" key={user} value={user.id}>
//                     {users[user].name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

Login.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired
};

function mapStateToProps({ users }) {
  return {
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: id => {
      dispatch(setAuthedUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
