import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StylesProvider } from '@material-ui/core/styles'
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
