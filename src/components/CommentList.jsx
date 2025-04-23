import React from "react";

function CommentList({ comments }) {
  return (
    <div className="comments-list">
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
}

export default CommentList;
