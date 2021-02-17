import React from 'react';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import ContentContainer from '../../components/ContentContainer';
import AboutContainer from '../../components/AboutContainer';

const About = ({ response, setResponse, preview, setPreview }) => {
  return (
    <div className="container">
      <div className="information">
        <Nav />
        <AboutContainer />
        <Footer />
      </div>
      <div className="content">
        <ContentContainer
          response={response}
          setResponse={setResponse}
          preview={preview}
          setPreview={setPreview}
        />
      </div>
    </div>
  );
};

export default About;
