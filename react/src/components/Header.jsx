import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={`/`} className="brand-logo">
          Music
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={`added`}>
              <b>Likes</b>
            </Link>
          </li>
          <li>
            <Link to={`author`}>
              <b>Recommended by the author</b>
            </Link>
          </li>
          <li>
            <Link to={`genre`}>
              <b>Recommended by the genre</b>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
