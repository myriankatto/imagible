import React, { useState } from 'react';

import Upload from '../Upload';
// import FileList from './components/FileList';
import Result from '../Result';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import axios from 'axios';
import api from '../../services/api';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const UploaderContainer = ({ response, setResponse, preview, setPreview }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
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

    api
      .post(
        'posts',
        data,
        {
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        {
          onUploadProgress: (e) => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));
            updateFile(uploadedFile.id, {
              progress,
            });
          },
        }
      )
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

  //to get all the images on the database
  // useEffect(() => {
  //   api.get('posts').then((response) => {
  //     console.log(response.data);
  //   });
  //   // setUploadedFiles(response.data.map((file) => ({
  //   //       id: file._id,
  //   //       name: file.name,
  //   //       readableSize: filesize(file.size),
  //   //       preview: file.url,
  //   //       uploaded: true,
  //   //       url: file.url,
  //   //     })),
  //   //   );
  // }, []);

  // const handleDelete = async (id) => {
  //   api.delete(`posts/${id}`);
  //   setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  // };

  // componentWillUnmount() {
  //   this.state.uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  // }

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
            <Upload onUpload={handleUpload} />
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
