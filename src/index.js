import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SortingVisualizer from './SortingVisualizer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SortingVisualizer />
  </React.StrictMode>
);

reportWebVitals();
