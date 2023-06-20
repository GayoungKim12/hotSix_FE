import axios from "axios";
import { JsonConfig } from "../API/AxiosModule";
import { useState } from "react";
import { useAtom } from "jotai";
import { editModeAtom } from "./Comment";
import { showCommentButtonsAtom } from "../../pages/DetailPage";
interface CommentToolButtonsProps {
  handleShow: () => void;
}

const CommentToolButtons = (props: CommentToolButtonsProps) => {
  const { comments, commentId, setComments, editComment, onClickClose } = props;
  const [showCommentButtons, setShowCommentButtons] = useAtom(
    showCommentButtonsAtom
  );
  // console.log(commentId);

  // console.log(comments);

  //댓글 삭제
  const deleteComment = () => {
    // const params = { id: commentId };
    // JsonConfig("delete", `commentList`, null, params).then((res) =>
    //   console.log(res)
    // );
    axios
      .delete(`http://localhost:3001/commentList/${commentId}`)
      .then((res) => console.log(res));
    alert("삭제되었습니다");
    setComments(
      comments.filter((c) => {
        return c.id !== commentId;
      })
    );
    setShowCommentButtons(false);
  };
  console.log(comments);
  //댓글 수정

  return (
    <div onClick={props.handleShow}>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-5" />
      <div className="fixed bottom-4 flex flex-col items-center z-50 w-full text-md">
        <div className="mb-2 w-11/12 rounded-xl bg-white shadow opacity-80">
          <button
            className="block px-4 py-3 w-full border-0 border-b-2 border-gray-200 rounded-none hover:border-gray-200 focus:outline-none"
            onClick={editComment}
          >
            댓글 수정{commentId}
          </button>
          <button
            className="block px-4 py-3 w-full border-0 rounded-t-none rounded-b-xl hover:border-0 focus:outline-none"
            onClick={deleteComment}
          >
            댓글 삭제
          </button>
        </div>
        <button
          className="px-4 py-3 w-11/12 border-0 rounded-xl shadow bg-white hover:border-0 focus:outline-none"
          onClick={onClickClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CommentToolButtons;
