import React from 'react';

function UrlLoader(props) {
  return (
    <div className="url-input">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.url}
          onChange={props.handleChange}
          placeholder="Paste image URL"
        />
        {props.visible ? (
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
