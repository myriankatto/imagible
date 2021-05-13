import React from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

function Upload({ onUpload }) {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          Drop your files here or <span className="color"> upload images.</span>
          <br />
          <span style={{ fontSize: '.8em', color: '#a7a6a6' }}>
            Image size must be less than 4MB.
          </span>
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Invalid file type! It only accepts .jpg and .png
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Drop your files here</UploadMessage>;
  };

  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}

export default Upload;
