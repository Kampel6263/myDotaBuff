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
// import Profile from "./pages/search/pages/";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
        </Routes>
        {/* </BrowserRouter> */}
      </div>
    </div>
  );
};

export default App;
