import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../firestoreService";
import "../style.css";
import "../reset.css";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useAuth } from "../AuthContext";



function Publication() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

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

  const [comments, setComments] = useState([]);

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

  const handleAddComment = (comment) => {
    if (!currentUser) {
      alert("Please log in to comment.");
      return;
    }
    const newComment = {
      comment,
      userEmail: currentUser.email,
      userId: currentUser.uid,
      timestamp: Date.now(),
    };
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [articleId]);

  useEffect(() => {
    const likedArticles =
      JSON.parse(localStorage.getItem("likedArticles")) || {};
    setIsLiked(!!likedArticles[articleId]);
  }, [articleId]);

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
              <CommentForm
                onAddComment={handleAddComment}
                articleId={articleId}
              />
              <CommentList comments={comments} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default Publication;
