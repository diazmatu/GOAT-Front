import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import GOAT from './jsx/GOAT.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('GOAT'));
root.render(
  <React.StrictMode>
    <GOAT />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
