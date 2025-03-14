import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrowIcon from "../../assets/arrow_icon.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Website Logo" className="nav-logo" />
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Features</li>
        <li className="nav-item">Pricing</li>
        <li className="nav-item">Blog</li>
      </ul>
      <div className="nav-right">
        <select
          name="currencyOption"
          id="currencyOption"
          className="nav-currency-select"
        >
          <option value="usd" className="nav-currency-item">
            USD
          </option>
          <option value="eur" className="nav-currency-item">
            EUR
          </option>
          <option value="inr" className="nav-currency-item">
            INR
          </option>
        </select>
        <button className="nav-login-button">
          Sign Up{" "}
          <img src={arrowIcon} alt="Arrow Icon" className="nav-arrow-icon" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
