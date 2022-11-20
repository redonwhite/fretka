import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App';
import './index.css';

const rootContainer = document.getElementById('root');
if (!rootContainer) throw Error("No #root element found in HTML");

const root = createRoot(rootContainer);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
