import { GoKebabHorizontal } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

import CommentToolButtons from "./CommentToolButtons";
import { IoIosSend } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
interface CommentProps {
  handleShow: () => void;
}

const Comment = (props: CommentProps) => {
  const { commentData, comments, setComments, accessToken, userId } = props;
  const [text, setText] = useState(commentData.content);
  const [editText, setEditText] = useState(false);
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const editComment = () => {
    setEditText(true);
    setShowCommentButtons(false);
  };
  const onClickClose = () => {
    setShowCommentButtons(false);
  };

  //댓글 수정해서 서버 / 배열 에 보냄
  const editCommentData = () => {
    const data = { content: text };
    axios
      .put(`http://43.200.78.88:8080/api/comment/${commentData.commentId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setComments(
          comments.map((c) => {
            console.log(c);
            return c.commentId === response.data ? { ...c, content: text } : c;
          })
        );
      });
    setEditText(false);
  };

  //댓글 수정중인거 취소
  const cancelCommentData = () => {
    setEditText(false);
    setText(commentData.content);
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-4 border-b-2">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-black">
              {commentData.imgPath !== "" ? (
                <img src={commentData.imgPath} />
              ) : (
                <div className="text-main-300 text-lg">
                  <FaUser />
                </div>
              )}
            </div>
            <div className="text-sm font-semibold text-black">{commentData.nickName}</div>
          </div>
          {userId === commentData.memberId && (
            <button
              className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
              onClick={() => {
                setShowCommentButtons(true);
              }}
            >
              <GoKebabHorizontal />
            </button>
          )}
        </div>
        {!editText ? (
          <p className="ml-1 text-lg">{commentData.content}</p>
        ) : (
          <form className="flex items-center p-2 gap-2 rounded-3xl bg-white" onSubmit={handleSubmit}>
            <textarea value={text} onChange={onChange} className="w-full px-3 py-1 rounded-lg resize-none focus:outline-none" />
            <button onClick={editCommentData}>
              <IoIosSend className="text-2xl" />
            </button>
            <button onClick={cancelCommentData}>
              <RiDeleteBinLine className="text-2xl" />
            </button>
          </form>
        )}

        <div className="flex items-start justify-between w-full">
          <div className="text-xs text-gray-400">{commentData.created_at}</div>
        </div>
      </div>

      {showCommentButtons && (
        <CommentToolButtons
          commentData={commentData}
          comments={comments}
          setComments={setComments}
          editComment={editComment}
          onClickClose={onClickClose}
          setShowCommentButtons={setShowCommentButtons}
        />
      )}
    </>
  );
};

export default Comment;
