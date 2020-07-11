import React from 'react';
import ReactDOM from 'react-dom';
import 'dotenv/config';//para usar variaveis ambiente
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);