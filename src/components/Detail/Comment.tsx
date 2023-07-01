import { GoKebabHorizontal } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import CommentToolButtons from "./CommentToolButtons";
import { IoIosSend } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { JsonConfig } from "../API/AxiosModule";
import { Dispatch, SetStateAction } from "react";

interface Comments {
  commentId: number;
  content: string;
  createdAt: string;
  imgPath: string;
  memberId: number;
  nickName: string;
}
[];

interface CommentProps {
  commentData: {
    nickName: string;
    imgPath: string;
    createdAt: string;
    content: string;
    commentId: number;
    memberId: number;
  };
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    imgPath: string;
    memberId: number;
    nickName: string;
  }[];
  setComments: Dispatch<SetStateAction<Comments[]>>;
  userId: number | undefined;
}

const Comment = (props: CommentProps) => {
  const { commentData, comments, setComments, userId } = props;
  const [text, setText] = useState(commentData.content);
  const [editText, setEditText] = useState(false);
  const [showCommentButtons, setShowCommentButtons] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
    JsonConfig("put", `api/comment/${commentData.commentId}`, data, undefined).then((response) => {
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

  function handleShow(): void {
    throw new Error("Function not implemented.");
  }
  console.log(commentData.createdAt.split("T"));

  return (
    <>
      <div className="flex flex-col gap-2 p-4 border-b-2">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-black">
              {commentData.imgPath !== "" ? (
                <img src={commentData.imgPath} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="text-main-300 text-lg">
                  <FaUser />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="text-sm font-semibold text-black">{commentData.nickName}</div>
              <div className="flex text-xs text-gray-400">
                {" "}
                <div className="mr-1">{commentData.createdAt.split("T")[0]}</div>
                <div className="text-right">{commentData.createdAt.split("T")[1]} </div>
              </div>
            </div>
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
      </div>

      {showCommentButtons && (
        <CommentToolButtons
          handleShow={handleShow}
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
