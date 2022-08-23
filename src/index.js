import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/components/App';
import './view/stylesheets/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App initDifficulty='easy' />
  </React.StrictMode>
);
