import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../App';
import About from '../pages/About';

export default function Routes() {
  const [response, setResponse] = useState('');
  const [preview, setPreview] = useState('');

  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About
            response={response}
            setResponse={setResponse}
            preview={preview}
            setPreview={setPreview}
          />
        </Route>

        <Route exact path="/">
          <App
            response={response}
            setResponse={setResponse}
            preview={preview}
            setPreview={setPreview}
          />
        </Route>
      </Switch>
    </Router>
  );
}
