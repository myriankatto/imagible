import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import NotFound404 from './pages/NotFound404';

import './styles/styles.scss';

function App() {
  const [theme, setTheme] = useState('dark');
  const [response, setResponse] = useState('');
  const [preview, setPreview] = useState('');

  const props = { theme, setTheme, preview, setPreview, response, setResponse };

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home {...props} />
          </Route>
          <Route exact path="/about">
            <About {...props} />
          </Route>
          <Route exact path="/resources">
            <Resources {...props} />
          </Route>
          <Route>
            <NotFound404 {...props} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
