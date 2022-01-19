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
import Profile from "./pages/search/pages/profile.component";
import Match from "./pages/match/match.component";
import Preloader from "./components/preloader/preloader.coponent";
// import Profile from "./pages/search/pages/";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PreloaderAnimation1 from "./assets/animation/Blocks.svg";
import PreloaderAnimation2 from "./assets/animation/preloader.svg";
import PreloaderAnimation3 from "./assets/animation/preloader2.svg";
import PreloaderAnimation4 from "./assets/animation/preloader3.svg";
import PreloaderAnimation5 from "./assets/animation/preloader4.svg";
const App = () => {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        {/* <BrowserRouter> */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate replace to="/heroes/" />} />
          {/* <Route path="/home/" element={<Home />} /> */}
          <Route path="/heroes/" element={<Heroes />} />
          <Route path="/search/:name" element={<Search />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route
            path="/search/profile/"
            element={<Navigate replace to="/search" />}
          />
          <Route path="/match/:id" element={<Match />} />
          <Route
            path="/preloaders"
            element={
              <div>
                <div>Preloaders</div>

                <object type="image/svg+xml" data={PreloaderAnimation1}>
                  svg-animation
                </object>
                <object type="image/svg+xml" data={PreloaderAnimation2}>
                  svg-animation
                </object>
                <object type="image/svg+xml" data={PreloaderAnimation3}>
                  svg-animation
                </object>
                <object type="image/svg+xml" data={PreloaderAnimation4}>
                  svg-animation
                </object>
                <object type="image/svg+xml" data={PreloaderAnimation5}>
                  svg-animation
                </object>
              </div>
            }
          />
        </Routes>
        {/* </BrowserRouter> */}
      </div>
    </div>
  );
};

export default App;
