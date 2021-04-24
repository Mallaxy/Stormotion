import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={s.navbar}>
      <NavLink to="/home" activeClassName={s.activeLink}>
        Settings
      </NavLink>
      <NavLink to="/classic" activeClassName={s.activeLink}>
        Game
      </NavLink>
    </div>
  );
}
