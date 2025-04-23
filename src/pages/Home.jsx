import React from "react";
import "../style.css";
import "../reset.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="wrapper-home">
      <main className="main-home">
        <section className="home-content">
          <h1 className="home-title">Adventure</h1>
          <p className="home-subtitle">Live Your Life</p>
          {!currentUser && (
            <Link to="/register">
              <button className="home-button" type="button">
                Register
              </button>
            </Link>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
