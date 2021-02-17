import React from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

function Upload({ onUpload } ) {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Drop your files here or <span className="green"> upload images.</span></UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Invalid file type! This project accepts .jpg and .png</UploadMessage>;
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
