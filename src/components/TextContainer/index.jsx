import React from 'react';

const TextContainer = ({ response, setResponse }) => {
  return (
    <>
      {response ? (
        <div className="text">
          <h1 className="color-title">Done.</h1>
          <h1>Get your description.</h1>
          <p>
            Want to upload more pictures? <span onClick={() => setResponse('')}>Start over.</span>
          </p>
        </div>
      ) : (
        <div className="text">
          <h1>
            Accessible <br /> images for all.
          </h1>
          <p>
            Paste or upload your images to generate smart description and alternative text for your
            images.
          </p>
        </div>
      )}
    </>
  );
};

export default TextContainer;
