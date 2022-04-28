import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/style/index.css";
import Home from './views/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(//renderiza essa funcao
  <React.StrictMode> 
    <Home/>{/*  */}
  </React.StrictMode>
);

