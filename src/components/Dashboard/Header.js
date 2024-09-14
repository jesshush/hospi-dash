import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header className="text-center mb-4">
      <h1 className="display-4 text-primary">Manufacturer Dashboard</h1>
      <p className="lead text-muted">Your company overview</p>
    </header>
  );
}

export default Header;
