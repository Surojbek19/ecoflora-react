import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import  CssBaseline  from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/material/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";


ReactDOM.render(  //.render() → actually draws your React components inside that root.
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
          <Router>
            <App />
          </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") //document is REAL DOM's instance, and we are getting "root" from it's method
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
