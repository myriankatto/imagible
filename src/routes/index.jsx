import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../App';
import About from '../pages/About';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  );
}
