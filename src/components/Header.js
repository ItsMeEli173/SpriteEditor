import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo" style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
        <img src={logo} alt="Logo" style={{borderRadius: '12px', border: '2px solid #3949ab'}} />
        <a href="/SpriteEditor" style={{color: '#3949ab', fontWeight: 'bold', fontSize: '1.1em', textDecoration: 'none', padding: '6px 14px', borderRadius: '8px', background: '#e3eafc', border: '1px solid #3949ab'}}>Inicio</a>
      </div>
      <h1>Sprites Editor UAJMS</h1>
    </header>
  );
}

export default Header;
