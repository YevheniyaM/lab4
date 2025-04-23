import React, { useState } from "react";

function CommentForm({ onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
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
