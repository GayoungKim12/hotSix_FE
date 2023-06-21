import { useState } from "react";
import Comment from "./Comment";
import CommentToolButtons from "./CommentToolButtons";

interface CommentListProps {
  handleShow: () => void;
}

const CommentList = (props: CommentListProps) => {
  const { comments, setComments, commentId, setCommentId } = props;

  return (
    <>
      <section className="pb-16">
        {comments &&
          comments.map((co) => {
            return (
              <Comment
                key={co.nick_name}
                handleShow={() => props.handleShow()}
                commentData={co}
                commentId={commentId}
                setCommentId={setCommentId}
                comments={comments}
                setComments={setComments}
              />
            );
          })}
      </section>
    </>
  );
};

export default CommentList;
