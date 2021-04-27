import React from 'react';
import Nav from '../../components/Nav';
import AboutContainer from '../../components/AboutContainer';
import UploaderContainer from '../../components/UploaderContainer';
import Footer from '../../components/Footer';

const About = (props) => {
  return (
    <div className="app__container">
      <Nav {...props} />
      <div className="content">
        <AboutContainer {...props} />
        <UploaderContainer {...props} />
      </div>
      <Footer />
    </div>
  );
};

export default About;
