import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar  m-t-2">
      <div className="container d-flex align-items-center">
        
        {/* Left side: Brand */}
        <Link className="navbar-brand" to="/">
          Stock Prediction App 
        </Link>
        {/* Right side: Buttons */}
        <div className="ms-auto">
          <Button text="Login" class="btn-outline-info" url="/login"/>
          &nbsp;
          <Button text="Register" class="btn-info" url="/register"/>
        </div>

      </div>
    </nav>
  );
};

export default Header;


