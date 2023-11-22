import React, { useState } from 'react';
import '../CSS/Header.css'; // Create a separate CSS file for styling
import { Pi } from 'react-icons/md';

import { PiCarSimpleBold } from "react-icons/pi";

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <header>
      <div className="logo">ARTS <PiCarSimpleBold/></div>
      <nav className={isDrawerOpen ? 'nav-drawer-open' : ''}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="menu-icon" onClick={toggleDrawer}>
        ☰
      </div>
    </header>
  );
};

export default Header;
