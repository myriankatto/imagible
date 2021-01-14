import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import axios from 'axios';
import api from './services/api';

import './styles/styles.scss';

import Upload from './components/Upload';
import Nav from './components/Nav';
import Footer from './components/Footer';
// import FileList from './components/FileList';
import Result from './components/Result';
import URLInput from './components/URLInput';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [allFiles, setAllFiles] = useState([]);
  const [response, setResponse] = useState('');
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState('');

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

  const handleUpload = (files) => {
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
      .post('posts', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updateFile(uploadedFile.id, {
            progress,
          });
        },
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

  // const handleDelete = async (id) => {
  //   api.delete(`posts/${id}`);
  //   setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  // };

  // componentWillUnmount() {
  //   this.state.uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  // }

  const ImageProcess = (url) => {
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
      .then(function(response) {
        const caption = response.data.description.captions[0].text;
        setResponse(caption);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    ImageProcess(url);
  };

  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setVisible(true);
    setPreview(e.target.value);
    setUrl(e.target.value);
  };

  return (
    <div className="container">
      <div className="about">
        <Nav />
        {response ? (
          <div className="text">
            <span className="green">Done.</span>
            <h1>Get your descriptions</h1>
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

        <Footer />
      </div>

      {response ? (
        <Result response={response} preview={preview} />
      ) : (
        <div className="content">
          <URLInput
            response={response}
            url={url}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            visible={visible}
          />
          <Upload onUpload={handleUpload} />
        </div>
      )}
      {/* 
        {uploadedFiles.length && (
            <FileList
              files={uploadedFiles}
              // onDelete={handleDelete}
            />
          )} */}
    </div>
  );
}

export default App;
