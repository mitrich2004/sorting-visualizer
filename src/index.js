import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import SortingVisualizer from './SortingVisualizer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SortingVisualizer />
  </React.StrictMode>
);

reportWebVitals();
