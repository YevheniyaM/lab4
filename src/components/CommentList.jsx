import React from "react";

function CommentList({ comments }) {
  return (
    <div className="comments-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment-item">
          <p className="comment-email">{comment.userEmail}</p>
          <p className="comment-text">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
