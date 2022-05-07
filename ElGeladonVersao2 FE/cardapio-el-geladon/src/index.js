import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/style/index.css";
import Home from './views/Home';//como quem renderiza a home é o app ele nem precisa estar, e por isso nao é usado
import App from 'App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(//renderiza essa funcao
  <React.StrictMode> 
    <App/>{/*  */}
  </React.StrictMode>
);

