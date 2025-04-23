import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticleById } from "../firestoreService";
import "../style.css";
import "../reset.css";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useAuth } from "../AuthContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Publication() {
  const query = useQuery();
  const articleId = query.get("id");
  const [article, setArticle] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const [comments, setComments] = useState(() => {
    const savedComments = JSON.parse(
      localStorage.getItem("allComments") || "{}"
    );
    return savedComments[articleId] || [];
  });

  const [isLiked, setIsLiked] = useState(() => {
    const likedArticles =
      JSON.parse(localStorage.getItem("likedArticles")) || {};
    return !!likedArticles[articleId];
  });

  const handleToggleLike = () => {
    if (!currentUser) {
      alert("Please log in to like articles.");
      return;
    }
    setIsLiked((prevIsLiked) => {
      const likedArticles =
        JSON.parse(localStorage.getItem("likedArticles")) || {};
      if (prevIsLiked) {
        delete likedArticles[articleId];
      } else {
        likedArticles[articleId] = true;
      }
      localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
      return !prevIsLiked;
    });
  };

  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem("allComments") || "{}");
    allComments[articleId] = comments;
    localStorage.setItem("allComments", JSON.stringify(allComments));
  }, [comments, articleId]);

  useEffect(() => {
    const likedArticles =
      JSON.parse(localStorage.getItem("likedArticles")) || {};
    setIsLiked(!!likedArticles[articleId]);
  }, [articleId]);

  const handleAddComment = (comment) => {
    if (!currentUser) {
      alert("Please log in to comment.");
      return;
    }
    setComments([...comments, comment]);
  };

  if (!article) {
    return <div>Loading article...</div>;
  }

  return (
    <div className="wrapper">
      <main className="main-publication">
        <article className={`publication-container ${isLiked ? "liked" : ""}`}>
          <h1 className="publication-header">{article.title}</h1>
          <div className="publication-info">
            <figure className="publication-img">
              <img
                src="https://res.cloudinary.com/dlistrvqm/image/upload/v1745412611/jx8iwwvdvyle3y0jm1s3.png"
                alt="Publication image about Japan travel"
              />
            </figure>
            <div className="publication-description">
              <p>{article.description}</p>
            </div>
          </div>
          <div className="publication-interactions">
            <div className="like-container">
              <input
                type="checkbox"
                id={`publicationLike${articleId}`}
                className="heart-checkbox"
                checked={isLiked}
                onChange={handleToggleLike}
              />
              <label
                htmlFor={`publicationLike${articleId}`}
                className="heart-label"
              >
                ♥
              </label>
            </div>
            <div className="comments-section">
              <h2 className="comments-title">Comments</h2>
              <CommentForm onAddComment={handleAddComment} />
              <CommentList comments={comments} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default Publication;
