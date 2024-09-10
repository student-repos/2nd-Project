import React from "react";
import "./Footer.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <div className="elem-container">
      <ul>
        <li className="icons1">
          <a href="https://www.facebook.com/" target="_blank">
            {" "}
            <FaFacebookSquare />
          </a>
        </li>
        <li className="icons2">
          <a href="https://www.instagram.com/" target="_blank">
            {" "}
            <FaInstagramSquare />
          </a>
        </li>
        <li className="icons3">
          <a href="https://x.com/?lang=en" target="_blank">
            <FaSquareXTwitter />
          </a>
        </li>
        <li className="icons4">
          <a href="https://www.youtube.com" target="_blank">
            <FaYoutube />
          </a>
        </li>
        <div className="tools">
          <div className="help">HELP</div>
          <div className="faqs">FAQS</div>
          <div className="priv">PRIVACY POLICY</div>
        </div>

        <div className="copy">
          &copy; 2024 Villingen-Schwenningen. All rights reserved.
        </div>
      </ul>
    </div>
  );
}

export default Footer;
