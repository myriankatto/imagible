import React from 'react';

const Result = ({ response, preview }) => {
  return (
    <div className="result">
      <img src={preview} alt={response} />
      <p>"{response}"</p>
      <a href="/">
        <button className="btn">Process new image</button>
      </a>
    </div>
  );
};

export default Result;
