import React from 'react';

function UrlLoader({ handleSubmit, handleChange, url, visible }) {
  return (
    <div className="url-input">
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleChange} placeholder="Paste image URL" />
        {visible ? (
          <button className="btn" type="submit">
            Generate description
          </button>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default UrlLoader;
