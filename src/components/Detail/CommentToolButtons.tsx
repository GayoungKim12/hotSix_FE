import axios from "axios";
import jwtDecode from "jwt-decode";

import { useState, useEffect } from "react";

interface CommentToolButtonsProps {
  handleShow: () => void;
}

const CommentToolButtons = (props: CommentToolButtonsProps) => {
  const { comments, commentId, setComments, editComment, onClickClose, commentData, setShowCommentButtons } = props;
  const [userId, setUserId] = useState();

  //토큰에서 유저아이디 파싱
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  // console.log(commentId);

  // console.log(comments);

  //댓글 삭제
  const deleteComment = () => {
    axios
      .delete(`http://43.200.78.88:8080/api/comment/${commentData.commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setComments(
          comments.filter((c) => {
            return c.commentId !== res.data;
          })
        );
      });
    alert("삭제되었습니다");

    setShowCommentButtons(false);
  };

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
            댓글 수정
          </button>
          <button
            className="block px-4 py-3 w-full border-0 rounded-t-none rounded-b-xl hover:border-0 focus:outline-none"
            onClick={deleteComment}
            // onClick={setDeletes(true)}
          >
            댓글 삭제
          </button>
        </div>
        <button className="px-4 py-3 w-11/12 border-0 rounded-xl shadow bg-white hover:border-0 focus:outline-none" onClick={onClickClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CommentToolButtons;
