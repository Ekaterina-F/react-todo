import React from "react";
import TodoPage from './todo-page';
import RegPage from "./reg-page";
import AuthPage from "./auth-page";
import EditTodoPage from "./edit-todo-page/edit-todo-page";
import "./App.css"
import {createBrowserHistory} from 'history';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {PATH} from "./route";

class App extends React.Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path={PATH.TODO} component={TodoPage}/>
          <Route path={PATH.REG} component={RegPage}/>
          <Route path={PATH.AUTH} component={AuthPage}/>
          <Route path={PATH.EDIT} component={EditTodoPage}/>
          <Redirect from='/' to={PATH.TODO}/>
        </Switch>
      </Router>
    )
  }
}

export default App
