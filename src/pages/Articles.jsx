import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import "../style.css";
import "../reset.css";
import { getArticles } from "../firestoreService";
import { useAuth } from "../AuthContext";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("likedArticles");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedArticles", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id) => {
    if (!currentUser) {
      alert("Please log in to like articles.");
      return;
    }
    setLikes((prevLikes) => {
      const updatedLikes = {
        ...prevLikes,
        [id]: !prevLikes[id],
      };
      localStorage.setItem("likedArticles", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  // Сортування статей за датою
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="wrapper">
      <main className="main-articles">
        <h1 className="main-heading">Articles</h1>
        <section className="section-articles">
          <ul className="articles">
            {sortedArticles.map((article) => (
              <Article
                key={article.id}
                article={article}
                isLiked={likes[article.id] || false}
                onToggleLike={toggleLike}
              />
            ))}
          </ul>
          <div className="learn-about">
            <a href="#">Learn about others</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Articles;
