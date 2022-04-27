import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(//renderiza essa funcao
  <React.StrictMode> 
    <Home/>{/*  */}
  </React.StrictMode>
);

