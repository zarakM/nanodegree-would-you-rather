import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../redux/actions/shared";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
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
        <Route exact path="/">
          {isLogin ? (
            <Fragment>
              <Appbar />
              <Dashboard />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/leaderboard">
          <Fragment>
            <Appbar />
            <LeaderBoard />
          </Fragment>
        </Route>

        <Route exact path="/add">
          <Fragment>
            <Appbar />
            <NewQuestion />
          </Fragment>
        </Route>

        <Route exact path="/questions/:id" render={(props)=>
        
            <QuestionDetails {...props} />
        }/>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/login" component={Login} />
        <Route>
          <Fragment>
            <Appbar />
            <ErrorRoute />
          </Fragment>
        </Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
