import React from 'react';

const AboutContainer = () => {
  return (
    <div className="about">
      <h1>About Imagible</h1>
      <p>
        <span className="green-word">Imagible</span> is a open source project born to create
        acessible images for all. This project uses Artificial Intelligence from Microsoft Computer
        Vision.
      </p>

      <p>
        This project is lead by{' '}
        <a href="https://www.anabatista.eu" target="_blank" rel="noopener noreferrer">
          Ana Batista
        </a>{' '}
        research at{' '}
        <a href="https://www.ulisboa.pt" target="_blank" rel="noopener noreferrer">
          University of Lisbon
        </a>{' '}
        and developed with{' '}
        <a href="https://www.myriankatto.com" target="_blank" rel="noopener noreferrer">
          Myrian Katto.
        </a>
      </p>
      <p>
        Want to be part of it? <br />
        Check out our{' '}
        <a href="https://github.com/myriankatto/imagible" target="_blank" rel="noopener noreferrer">
          github project
        </a>{' '}
        or get in contact.
      </p>
      <div className="buttons">
        <button>Research</button>
        <button>Github</button>
      </div>
    </div>
  );
};

export default AboutContainer;
