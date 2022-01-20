import classNames from "classnames";
import React from "react";
import classes from "./title.module.scss";

const Title: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div
      className={
        className ? classNames(classes.title, className) : classes.title
      }
    >
      {children}
    </div>
  );
};

export default Title;
