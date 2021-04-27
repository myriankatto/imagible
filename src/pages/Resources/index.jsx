import React from 'react';
import Nav from '../../components/Nav';
import ResourcesContainer from '../../components/ResourcesContainer';
import UploaderContainer from '../../components/UploaderContainer';
import Footer from '../../components/Footer';

const Resources = (props) => {
  return (
    <div className="app__container">
      <Nav {...props} />
      <div className="content">
        <ResourcesContainer {...props} />
        <UploaderContainer {...props} />
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
