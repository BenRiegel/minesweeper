// module: index.js
// author: Ben Riegel
// overview: sets up and renders app


//----- imports ----------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/components/App';
import './view/stylesheets/index.css';


//----- local code block -------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
