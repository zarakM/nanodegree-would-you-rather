import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../redux/actions/shared";
import { Route, Switch} from 'react-router-dom';
import Logout from "./Logout";
import Dashboard from './Dashboard'
import Appbar from './Appbar'
import QuestionDetails from './QuestionDetails'

import Login from "./Login";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { isLogin } = this.props;

    return (
      <Switch>
        {isLogin ? (
          <div>
            <Appbar/>
            <Route path="/" exact component={Dashboard} />
            {/* <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/add" component={NewQuestion} />*/}
            <Route path="/questions/:id" component={QuestionDetails} /> 
            <Route exact path="/logout" component={Logout} />
          </div>
        ) : (
          <Route path="/" component={Login} />
        )}
      </Switch>
    );
    // ) <div>{isLogin ? <Appbar /> : <Login />}</div>;
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isLogin: authedUser !== null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
