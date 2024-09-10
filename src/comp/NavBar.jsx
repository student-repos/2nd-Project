import React from "react";
import { NavLink } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
/* import { TiThMenu } from "react-icons/ti"; */
import "./NavBar.css";

function NavBar() {
  return (
    <ul>
      <h2 className="logo">
        Best<span className="music">Music</span>
      </h2>

      <li>
        <NavLink to="/">
          <FaHouse className="house" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/playlist">
          <FaHeadphones className="hphones" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/cartitems">
          <GiShoppingCart className="shopCart" />
        </NavLink>
      </li>
      <li>
        <NavLink style={{ textDecoration: "none" }}>
          <div>
            <input
              type="text"
              id="search"
              placeholder="search.."
              className="searchbar"
            />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">
          <button className="btn-1">LOGIN</button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register">
          <button className="btn-2">REGISTER</button>
        </NavLink>
      </li>

      <li>
        {/*  <TiThMenu className="menu" /> */}
        <div className="ham-menu">
          <div className="sp-1"></div>
          <div className="sp-2"></div>
          <div className="sp-3"></div>
          <ul className="links-container">
            <li>
              <a href="#">About</a>
            </li>
            <li className="contact">
              <a href="#">Contact</a>
            </li>
            <li className="service">
              <a href="#">Service</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
}

export default NavBar;
