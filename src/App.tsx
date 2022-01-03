import React from "react";
import "./App.css";
import classes from "./App.module.scss";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/home.component";
import Heroes from "./pages/heroes/heroes.component";
import Navigation from "./components/navigation/navigation.component";
import Search from "./pages/search/search.component";
import Profile from "./pages/search/profile/profile.component";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        {/* <BrowserRouter> */}
        <Navigation />
        <Routes>
          <Route
            path="/myDotaBuff/"
            element={<Navigate replace to="/myDotaBuff/home/" />}
          />
          <Route path="/myDotaBuff/home/" element={<Home />} />
          <Route path="/myDotaBuff/heroes/" element={<Heroes />} />
          <Route path="/myDotaBuff/search/" element={<Search />} />
          <Route
            path="/myDotaBuff/search/profile/:id/*"
            element={<Profile />}
          />
          <Route
            path="/myDotaBuff/search/profile/"
            element={<Navigate replace to="/myDotaBuff/search" />}
          />
        </Routes>
        {/* </BrowserRouter> */}
      </div>
    </div>
  );
};

export default App;
