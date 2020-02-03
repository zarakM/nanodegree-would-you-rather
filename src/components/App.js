import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../redux/actions/shared";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Appbar from "./Appbar";
import LeaderBoard from "./LeaderBoard";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import ErrorRoute from "./ErrorRoute";

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
            <Appbar />
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/add" exact component={NewQuestion} />
            <Route path="/questions/:id" exact component={QuestionDetails} />
            <Route path="/logout" exact component={Logout} />
            <Route exact path="/404" component={ErrorRoute} />
            <Redirect to="/404"/>
          </div>
        ) : (
          <Route path="/" component={Login} />
        )}
      </Switch>
    );
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
