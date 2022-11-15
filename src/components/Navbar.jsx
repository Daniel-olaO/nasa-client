import React from 'react';
import {BsFillCaretDownFill} from 'react-icons/bs';
import '../App.css';

const Navbar = ({userName, logOut}) => {
  return (
    <nav className="navbar">
      <h1>Nasa APOD Texting Service</h1>
      {userName ? (
            <div className="dropdown">
              <button className="dropbtn">{userName}
                <BsFillCaretDownFill/>
              </button>
              <div className="dropdown-content">
                <a onClick={logOut}>Log Out</a>
              </div>
            </div>
        ):(
            null
        )}

    </nav>
  );
};

export default Navbar;
