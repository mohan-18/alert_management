import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from './User';
import Branch from './Branch';
import Admin from './Admin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/user" component={User} />
          <Route exact path="/branch/" component={Branch} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

