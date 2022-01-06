import React from "react";
import "./style.css";
import { marked } from "marked";

const Comments = ({ issue, comments }) => {
  let issueCreated = new Date(issue.created_at).toLocaleDateString();
  const issueBody = marked.parse(issue.body || "");

  const close = () => {
    let commentClose = document.getElementById("comments-container");
    commentClose.parentNode.removeChild(commentClose);
  };

  const renderComments = (comment) => {
    let commentOn = new Date(comment.created_at).toLocaleDateString();
    const commentMarked = marked.parse(comment.body);

    return (
      <div className="inner-container" key={comment.id}>
        <div>
          <div className="user-comment">
            <p>
              <strong>{comment.user?.login}</strong> commented on {commentOn}
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: commentMarked }}></div>
        </div>
      </div>
    );
  };

  return (
    <div id="comments-container">
      <div>
        <button onClick={close}> Close</button>
      </div>
      <div className="user-comment">
        <p>
          Creator: <strong>{issue.user?.login}</strong> commented on{" "}
          {issueCreated}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: issueBody }}></div>
      {comments?.map((comment) => renderComments(comment))}
    </div>
  );
};

export default Comments;
