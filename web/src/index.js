import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './dist/style.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {BrowserRouter} from "react-router-dom";
import { Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Ripple });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
);

