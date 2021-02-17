import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo-imagible-03.svg';

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img src={logo} alt="Imagible" />
      </Link>
      <div className="links">
        <Link to="/about" alt="about">
          About
        </Link>
        <Link to="/publications" alt="publications">
          Publications
        </Link>
        <a href="/#">Open Source</a>
      </div>
    </div>
  );
};

export default Nav;
