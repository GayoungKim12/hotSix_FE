import { useState } from "react";
import CommentForm from "../components/Detail/CommentForm";
import Detail from "../components/Detail/Detail";
import PostToolButtons from "../components/common/PostToolButtons";
import CommentToolButtons from "../components/Detail/CommentToolButtons";
import GoBackButton from "../components/common/GoBackButton";
import CommentList from "../components/Detail/CommentList";

const DetailPage = () => {
  const [showPostButtons, setShowPostButtons] = useState(false);
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  return (
    <div className="bg-main-100">
      <div className="fixed top-0 flex items-center justify-between px-4 w-full h-14 bg-main-100 shadow-md">
        <GoBackButton />
      </div>
      <article className="flex flex-col items-start gap-2 pt-14 min-w-0">
        <Detail handleShow={() => setShowPostButtons(true)} />
      </article>
      <CommentList handleShow={() => setShowCommentButtons(true)} />
      <CommentForm />
      {showPostButtons && <PostToolButtons handleShow={() => setShowPostButtons(false)} />}
      {showCommentButtons && <CommentToolButtons handleShow={() => setShowCommentButtons(false)} />}
    </div>
  );
};

export default DetailPage;
