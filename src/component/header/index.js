import React from 'react';
import './Header.css';
import Button from "../button"

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Task Tracker</h1>
      <Button className="btn">
        Close
      </Button>
    </header>
  );
};

export default Header;