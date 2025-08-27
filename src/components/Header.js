import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1>Sprites Editor UAJMS</h1>
    </header>
  );
}

export default Header;
