import React from 'react';

const InformationContainer = ({ response }) => {
  return (
    <div>
      {response ? (
        <div className="text">
          <span className="green-title">Done.</span>
          <h1>Get your description</h1>
          <p>
            Want to upload more pictures? <a href="/">Start over.</a>
          </p>
        </div>
      ) : (
        <div className="text">
          <h1>
            Accessible <br /> images for all.
          </h1>
          <p>
            Past or upload your image to generate smart description and alternative text for your
            picture.
          </p>
        </div>
      )}
    </div>
  );
};

export default InformationContainer;
