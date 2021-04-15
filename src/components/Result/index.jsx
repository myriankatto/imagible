import React from 'react';
import { Button } from 'antd';
const Result = ({ response, preview }) => {
  return (
    <div className="result">
      <img src={preview} alt={response} />
      <p>"{response}"</p>

      <div className="btn-container">
        <Button
          type="primary"
          className="copy"
          onClick={() => navigator.clipboard.writeText(response)}
        >
          Copy Description
        </Button>
      </div>
    
    </div>
  );
};

export default Result;
