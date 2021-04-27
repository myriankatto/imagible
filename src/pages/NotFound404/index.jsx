import React from 'react';
import Nav from '../../components/Nav';

const NotFound404 = (props) => {
  return (
    <div className="app__container">
      <Nav {...props} />
      <div className="content">
        <div className="not_found">
          <h1>404</h1>
          <p>Page not Found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
