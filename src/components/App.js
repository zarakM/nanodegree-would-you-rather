import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../redux/actions/shared";
import { Route, Switch } from "react-router-dom";
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
            <Fragment>
              <Appbar />
              <Route path="/" exact component={Dashboard} />
              <Route path="/LeaderBoard" exact component={LeaderBoard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/questions/:id" component={QuestionDetails} />
              <Route exact path="/logout" component={Logout} />
            </Fragment>
          ) : (
            <Route path="/" exact component={Login} />
          )}
          <Route component={ErrorRoute} />
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
