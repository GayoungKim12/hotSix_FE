import { useState } from "react";
import CommentForm from "../components/Detail/CommentForm";
import Detail from "../components/Detail/Detail";
import PostToolButtons from "../components/common/PostToolButtons";
import CommentToolButtons from "../components/Detail/CommentToolButtons";
import CommentList from "../components/Detail/CommentList";
import Header from "../components/Detail/Header";
import { useParams } from "react-router-dom";
import { React, useEffect } from "react";
import { JsonConfig } from "../components/API/AxiosModule";
import axios from "axios";
import { atom, useAtom } from "jotai";
import { showPostButtonsAtom } from "./MainPage";

export const showCommentButtonsAtom = atom(false);

const DetailPage = () => {
  const [showPostButtons, setShowPostButtons] = useState(false);
  const [showCommentButtons, setShowCommentButtons] = useAtom(
    showCommentButtonsAtom
  );

  const { postId } = useParams();
  const [commentId, setCommentId] = useState<number | null>();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    JsonConfig("get", `commentList?post_id=${postId}`, null).then((res) =>
      setComments(res.data)
    );
  }, []);

  if (!postId) return null;

  return (
    <div className="pt-14 min-h-screen bg-main-100">
      <Header />
      <Detail handleShow={() => setShowPostButtons(true)} postId={postId} />
      <CommentList
        handleShow={() => setShowCommentButtons(true)}
        comments={comments}
        setComments={setComments}
        commentId={commentId}
        setCommentId={setCommentId}
      />
      <CommentForm />
      {showPostButtons && (
        <PostToolButtons
          postId={postId}
          handleShow={() => setShowPostButtons(false)}
        />
      )}
    </div>
  );
};

export default DetailPage;
