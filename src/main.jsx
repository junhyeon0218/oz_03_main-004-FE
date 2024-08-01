import ReactDOM from 'react-dom/client';
import React from 'react'; // React를 import합니다.
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
