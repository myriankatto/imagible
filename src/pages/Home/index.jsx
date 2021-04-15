import React from 'react';
import Nav from '../../components/Nav';
import TextContainer from '../../components/TextContainer';
import UploaderContainer from '../../components/UploaderContainer';
import Footer from '../../components/Footer';

const Home = (props) => {
  return (
    <div className="app__container">
      <Nav {...props} />
      <div className="content">
        <TextContainer {...props} />
        <UploaderContainer  {...props}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
