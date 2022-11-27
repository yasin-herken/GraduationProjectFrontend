import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/css/app.css";
import {
  BrowserRouter,
} from "react-router-dom";
import 'primeicons/primeicons.css';
import { PersistGate } from 'redux-persist/integration/react';
import store,{Persistor} from './Store/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={Persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
