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

interface CommentToolButtonsProps {
  handleShow: () => void;
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    imgPath: string;
    memberId: number;
    nickName: string;
  }[];
  setComments: Dispatch<SetStateAction<Comments[]>>;
  editComment: () => void;
  onClickClose: () => void;
  commentData: {
    nickName: string;
    imgPath: string;
    createdAt: string;
    content: string;
    commentId: number;
    memberId: number;
  };
  setShowCommentButtons: Dispatch<SetStateAction<boolean>>;
}

const CommentToolButtons = (props: CommentToolButtonsProps) => {
  const { comments, setComments, editComment, onClickClose, commentData, setShowCommentButtons } = props;

  //댓글 삭제
  const deleteComment = () => {
    const ok = window.confirm("정말 삭제하실꺼죠😃?");

    if (ok) {
      JsonConfig("delete", `api/comment/${commentData.commentId}`, null, undefined).then((res) => {
        console.log(res);
        setComments(
          comments.filter((c) => {
            return c.commentId !== res.data;
          })
        );
      });
      alert("삭제되었습니다😉");
    }

    setShowCommentButtons(false);
  };
  console.log(comments);

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
          <button className="block px-4 py-3 w-full border-0 rounded-t-none rounded-b-xl hover:border-0 focus:outline-none" onClick={deleteComment}>
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
