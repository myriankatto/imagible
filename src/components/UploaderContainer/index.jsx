import React, { useState } from 'react';
import { Upload, Button } from 'antd';

import UploadComponent from '../Upload';
// import FileList from './components/FileList';
import Result from '../Result';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const UploaderContainer = ({ response, setResponse, preview, setPreview }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [allFiles, setAllFiles] = useState([]);

  const handleUpload = (files) => {
    setLoading(true);
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    // eslint-disable-next-line array-callback-return
    uploadedFiles.map((file) => {
      if (file.file.size > 4000000) {
        setError('File size is bigger than 4MB');
      }
    });

    setUploadedFiles(uploadedFiles);
    setPreview(uploadedFiles[0].preview);
    uploadedFiles.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
      })
    );
  };
  const processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);

    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + '/posts',
      data,
    })
      .then((response) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
        const urlLink = response.data.url;
        ImageProcess(urlLink);
        handleSubmit();
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };
  const ImageProcess = (url) => {
    setLoading(true);

    const uriBase = process.env.REACT_APP_ENDING_POINT + 'vision/v3.0/analyze';
    const params = 'visualFeatures=Categories%2CDescription%2CColor&details=&language=en';

    axios({
      method: 'post',
      url: uriBase + '?' + params,
      // eslint-disable-next-line no-useless-concat
      data: '{"url": ' + '"' + url + '"}',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_SUBSCRIPTION_KEY,
      },
    })
      .then(function (response) {
        setLoading(false);
        const caption = response.data.description.captions[0].text;
        setResponse(caption);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ImageProcess(url);
    setUrl('');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPreview(e.target.value);
    setUrl(e.target.value);
  };

  const props = {
    name: 'file',

    customRequest: async ({ onSuccess, onError, file }) => {
      const uploadedFile = {
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      };

      setPreview(uploadedFile.preview);

      if (file.size > 4000000) {
        setError('File size is bigger than 4MB');
      }

      const data = new FormData();
      data.append('file', uploadedFile.file, uploadedFile.name);
      setLoading(true);

      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + '/posts',
        data,
      })
        .then((response) => {
          onSuccess(response);
          updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url,
          });
          const urlLink = response.data.url;
          ImageProcess(urlLink);
          handleSubmit();
        })
        .catch((err) => {
          onError(err);
          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    },
  };

  const handleTryAgain = () => {
    setResponse('');
    setError('');
  };

  return (
    <div className="upload">
      <div className="card">
        {response && !loading ? (
          <Result response={response} preview={preview} />
        ) : loading ? (
          <div className="spinner">
            <Spin indicator={<LoadingOutlined />} />
            <span>Processing image...</span>
          </div>
        ) : error && !response && !loading ? (
          <div className="spinner">
            <p style={{ color: '#a7a6a6' }}>{error}</p>
            <button className="btn" onClick={handleTryAgain}>
              Try again
            </button>
          </div>
        ) : (
          <div className="uploader">
            <div className="header">
              <h4>Add your image</h4>
              <p>Start generating smart descriptions</p>
              <hr />
            </div>
            <input type="text" value={url} onChange={handleChange} placeholder="Paste image URL" />
            <span>
              <em>or</em>
            </span>
            <div className="uploader-component">
              <UploadComponent onUpload={handleUpload} />
            </div>
            <div className="uploader-component-mobile">
              <Upload {...props}>
                <Button>Upload your image</Button>
                <p
                  style={{
                    fontSize: '.8em',
                    color: '#a7a6a6',
                    marginTop: '.8em',
                    textAlign: 'center',
                  }}
                >
                  Image size must be less than 4MB.
                </p>
              </Upload>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Generate description
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploaderContainer;
