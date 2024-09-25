import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { SearchProvider } from './Context/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </SearchProvider>
  </React.StrictMode>
);

