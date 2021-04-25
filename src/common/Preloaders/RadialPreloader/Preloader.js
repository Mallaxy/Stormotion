import React from "react";
import classes from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div className={classes.ldsRoller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Preloader;
