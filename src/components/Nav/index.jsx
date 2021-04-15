import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { HamburgerCollapse } from 'react-animated-burgers';

import logoDark from '../../assets/logo-imagible-dark.svg';
import logoLight from '../../assets/logo-imagible-white.svg';

import { Moon, Sun } from 'react-feather';

const Nav = ({ theme, setTheme }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = useCallback(() => setIsActive((prevState) => !prevState), []);
  return (
    <>
      <nav className="nav">
        <Link to="/">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Imagible" />
        </Link>

        <ul>
          <li>
            <Link to="/about" alt="about">
              About
            </Link>
          </li>
          <li>
            <Link to="/resources" alt="resources">
              Resources
            </Link>
          </li>
          <li>
            <a href="/" alt="Github">
              GitHub
            </a>
          </li>
          <div className="theme_icon">
            {theme === 'dark' ? (
              <Sun onClick={() => setTheme('light')} />
            ) : (
              <Moon onClick={() => setTheme('dark')} />
            )}
          </div>
        </ul>
      </nav>

      <div className="mobile-nav">
        <Link to="/">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Imagible" />
        </Link>
        <HamburgerCollapse
          buttonColor="transparent"
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
