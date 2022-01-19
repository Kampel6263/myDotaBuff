import React from "react";
import classes from "./preloader.module.scss";
import PreloaderAnimation from "../../assets/animation/preloader2.svg";

const Preloader = () => {
  return (
    <div className={classes.preloader}>
      <object type="image/svg+xml" data={PreloaderAnimation}>
        svg-animation
      </object>
    </div>
  );
};

export default Preloader;
