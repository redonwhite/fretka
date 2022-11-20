import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


const rootContainer = document.getElementById('root');
if (!rootContainer) throw Error("No #root element found in HTML");
const root = createRoot(rootContainer); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
