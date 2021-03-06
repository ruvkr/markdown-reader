import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
