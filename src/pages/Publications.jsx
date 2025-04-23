import React from "react";
import { imageData } from "../imageData";
import "../style.css";
import "../reset.css";

function Publications() {
  return (
    <div className="wrapper">
      <main className="main-gallery">
        <h1 className="main-heading">My Publications</h1>
        <section className="section-gallery">
          <div className="gallery">
            {imageData.map((article) => (
              <figure key={article.id} className="gallery-item">
                <img src={article.image} alt={article.alt} />
                <figcaption className="gallery-buttons">
                  <button className="gallery-btn delete" type="button">
                    Delete
                  </button>
                  <button className="gallery-btn edit" type="button">
                    Edit
                  </button>
                </figcaption>
              </figure>
            ))}
            <div className="add-publication">
              <button
                type="button"
                className="add-content"
                aria-label="Add new publication"
              >
                +
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Publications;
