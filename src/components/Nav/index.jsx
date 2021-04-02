import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { HamburgerCollapse } from 'react-animated-burgers';

import logo from '../../assets/logo-imagible-03.svg';

const Nav = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = useCallback(() => setIsActive((prevState) => !prevState), []);

  return (
    <>
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
        </div>
      </div>

      <div className="mobile-menu">
        <Link to="/">
          <img src={logo} alt="Imagible" />
        </Link>
        <HamburgerCollapse
          buttonColor="#26272e"
          barColor="white"
          buttonWidth={20}
          {...{ isActive, toggleButton }}
        />
      </div>
      {isActive && (
        <div className="mobile-menu-container">
          <Link to="/about" alt="about">
            About
          </Link>
          <Link to="/publications" alt="publications">
            Publications
          </Link>
          <a href="/#">Open Source</a>
        </div>
      )}
    </>
  );
};

export default Nav;
