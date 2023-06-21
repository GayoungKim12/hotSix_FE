import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { showCommentButtonsAtom } from "../../pages/DetailPage";
import CommentToolButtons from "./CommentToolButtons";
interface CommentProps {
  handleShow: () => void;
}

const Comment = (props: CommentProps) => {
  const { commentData, commentId, setCommentId, comments, setComments } = props;
  const [text, setText] = useState(commentData.comment);
  const [editText, setEditText] = useState(false);

  const onChange = (e) => {
    setText(e.target.value);
  };
  const [showCommentButtons, setShowCommentButtons] = useAtom(
    showCommentButtonsAtom
  );

  const editComment = () => {
    setEditText(true);
    setShowCommentButtons(false);
  };
  const onClickClose = () => {
    setShowCommentButtons(false);
  };
  console.log(editText);
  console.log(comments);
  return (
    <>
      <div className="flex flex-col gap-2 p-4 border-b-2">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 border-2 rounded-full text-black"></div>
            <div className="text-base font-semibold text-black">
              {commentData.nick_name}
            </div>
          </div>
          <button
            className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
            onClick={() => {
              setShowCommentButtons(true);
              // setEditText(true);
              setCommentId(commentData.id);
            }}
          >
            <GoKebabHorizontal />
          </button>
        </div>
        {!editText ? (
          <p>{commentData.comment}</p>
        ) : (
          <input value={text} onChange={onChange} />
        )}

        <div className="flex items-start justify-between w-full">
          <div className="text-xs text-gray-400">{commentData.created_at}</div>
        </div>
      </div>

      {showCommentButtons && (
        <CommentToolButtons
          comments={comments}
          setComments={setComments}
          commentId={commentId}
          setCommentId={setCommentId}
          editComment={editComment}
          onClickClose={onClickClose}
        />
      )}
    </>
  );
};

export default Comment;
