import React from 'react';
import { Copy } from 'react-feather';
import { Button } from 'antd';
const Result = ({ response, preview }) => {
  return (
    <div className="content-result">
      <img src={preview} alt={response} />
      <p>"{response}"</p>

      <div className="btn-container">
        <Button className="copy" onClick={() => navigator.clipboard.writeText(response)}>
          <Copy />
        </Button>
      </div>
      <span>
        Something wrong? <a href="/">Start again</a>
      </span>
    </div>
  );
};

export default Result;
