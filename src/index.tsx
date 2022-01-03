import "./index.css";
import reportWebVitals from "./reportWebVitals";

import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter, Router, RouterProps } from "react-router-dom";
import { State } from "../src/business-logic/redux/config";
import { createBrowserHistory } from "history";
import { createStore } from "../src/business-logic/redux";

import App from "./App";
import { getheroes } from "./business-logic/redux/store";
const history = createBrowserHistory();
const store = createStore(history);

const AppContent: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.general);

  React.useEffect(() => {
    dispatch(getheroes());
  }, []);

  // if (!data.length) {
  //   return <Preloader isActive />;
  // }
  return <React.Fragment>{children}</React.Fragment>;
};

ReactDOM.render(
  <Provider store={store}>
    <AppContent>
      <BrowserRouter basename="/myDotaBuff/">
        <App />
      </BrowserRouter>
    </AppContent>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
