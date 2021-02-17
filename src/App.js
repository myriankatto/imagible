import React from 'react';
import './styles/styles.scss';

import Nav from './components/Nav';
import Footer from './components/Footer';
import ContentContainer from './components/ContentContainer';
import InformationContainer from './components/InformationContainer';

function App({ response, setResponse, preview, setPreview }) {
  return (
    <div className="container">
      <div className="information">
        <Nav />
        <InformationContainer response={response}/>
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
}

export default App;
