import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/style/index.css";
import Home from './views/Home';
import App from 'App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(//renderiza essa funcao
  <React.StrictMode> 
    <App/>{/*  */}
  </React.StrictMode>
);

