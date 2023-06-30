import { useState } from "react";
import Detail from "../components/Detail/Detail";
import PostToolButtons from "../components/common/PostToolButtons";
import CommentList from "../components/Detail/CommentList";
import Header from "../components/Detail/Header";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const [showPostButtons, setShowPostButtons] = useState(false);
  const { postId } = useParams();

  if (!postId) return <></>;

  return (
    <div className="pt-14 min-h-screen bg-main-100">
      <Header />
      <Detail handleShow={() => setShowPostButtons(true)} postId={postId} />
      <CommentList postId={postId} handleShow={() => setShowPostButtons(false)} />
      {showPostButtons && <PostToolButtons postId={postId} handleShow={() => setShowPostButtons(false)} />}
    </div>
  );
};

export default DetailPage;
