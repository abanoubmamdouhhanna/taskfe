import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import navStyle from "./Navbar.module.css";
import { jwtDecode } from "jwt-decode";

export default function Navbar({  LOgOut }) {

  let token= localStorage.getItem('userToken');


  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <h3>Task</h3>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/map">
                    Map
                  </NavLink>
                </li>
                <li className="nav-item ms-3">
                  <span className={`${navStyle.span}`} onClick={LOgOut}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
