import React from 'react';
import Nav from '../../components/Nav';
import HowItWorksContainer from '../../components/HowItWorksContainer';
import UploaderContainer from '../../components/UploaderContainer';
import Footer from '../../components/Footer';

const HowItWorks = (props) => {
  return (
    <div className="app__container">
      <Nav {...props} />
      <div className="content">
        <HowItWorksContainer {...props} />
        <UploaderContainer {...props} />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
