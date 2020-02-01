import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import middleware from "./redux/middleware";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
import NewQuestion from "./components/NewQuestion";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import LeaderBoard from './components/LeaderBoard'
// import Login from "./Login";
// import QuestionDetails from "./components/QuestionDetails"

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
