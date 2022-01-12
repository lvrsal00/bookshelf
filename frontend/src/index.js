import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={App} />
      </BrowserRouter>
    </CookiesProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
