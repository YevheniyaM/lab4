import React, { useState } from "react";
import { saveComment } from "../firestoreService";
import { useAuth } from "../AuthContext";

function CommentForm({ onAddComment, articleId }) {
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useAuth();

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      saveComment(
        articleId,
        newComment.trim(),
        currentUser.email,
        currentUser.uid
      );
      setNewComment("");
    }
  };

  return (
    <form className="comment-form" onSubmit={handleAddComment}>
      <div className="comment-input-wrapper">
        <textarea
          className="comment-input"
          placeholder="Leave your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="comment-submit">
          Add a comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
