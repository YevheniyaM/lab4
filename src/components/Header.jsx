import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { auth } from "../firebaseConfig";
import UploadButton from "./UploadButton";

function Header() {
  const { currentUser } = useAuth();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("You have been logged out.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <header className="header">
      <div className="container-header">
        <Link to="/" className="logo-text">
          My Travel
        </Link>
        <nav className="main-nav">
          <ul className="nav-items">
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>
              <Link to="/publications">My Publications</Link>
            </li>
            <li>
              {currentUser ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>{/* <UploadButton /> */}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
