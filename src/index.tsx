import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import  CssBaseline  from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/material/MaterialTheme";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";
import ContextProvider from "./app/context/ContextProvider";

const container = document.getElementById('root')!; //document is REAL DOM's instance, and we are getting "root" from it's method
const root = createRoot(container);


root.render(  //.render() → actually draws your React components inside that root.
  <React.StrictMode> 
    {/* React’s "debugging assistant */}
    <Provider store={store}>
      {/* connecting your app to Redux(ma'lumotlar bunkeri) */}
      <ContextProvider>
         <ThemeProvider theme={theme}>
        {/* customized component */}
         <CssBaseline />
         {/* It helps ensure your app looks the same across all browsers */}
          <Router>
            {/* It enables routing — so you can navigate between pages (URLs) in your app without reloading. */}
            <App />
          </Router>
      </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
