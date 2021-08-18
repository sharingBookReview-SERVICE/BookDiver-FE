import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./App.css"
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configStore";


import { Provider } from "react-redux";
import store from "./redux/configStore";

import { ThemeProvider } from "styled-components";
import  theme  from "../src/shared/theme"



ReactDOM.render(

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
