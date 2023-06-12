import { useState } from "react";
import CommentForm from "../components/Detail/CommentForm";
import Detail from "../components/Detail/Detail";
import PostToolButtons from "../components/common/PostToolButtons";
import CommentToolButtons from "../components/Detail/CommentToolButtons";
import CommentList from "../components/Detail/CommentList";
import Header from "../components/Detail/Header";

const DetailPage = () => {
  const [showPostButtons, setShowPostButtons] = useState(false);
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  return (
    <div className="pt-14 bg-main-100">
      <Header />
      <Detail handleShow={() => setShowPostButtons(true)} />
      <CommentList handleShow={() => setShowCommentButtons(true)} />
      <CommentForm />
      {showPostButtons && <PostToolButtons handleShow={() => setShowPostButtons(false)} />}
      {showCommentButtons && <CommentToolButtons handleShow={() => setShowCommentButtons(false)} />}
    </div>
  );
};

export default DetailPage;
