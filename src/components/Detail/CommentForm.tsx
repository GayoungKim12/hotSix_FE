import jwtDecode from "jwt-decode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import Footer from "../common/Footer";
import { JsonConfig } from "../API/AxiosModule";

interface Comments {
  commentId: number;
  content: string;
  createdAt: string;
  imgPath: string;
  memberId: number;
  nickName: string;
}
[];

interface CommentFormProps {
  postId: number | string;
  comments: {
    commentId: number;
    content: string;
    createdAt: string;
    imgPath: string;
    memberId: number;
    nickName: string;
  }[];
  setComments: Dispatch<SetStateAction<Comments[]>>;
}

interface DecodedToken {
  id: string;
}

const CommentForm = ({ postId, comments, setComments }: CommentFormProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const [content, setContent] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  //댓글등록 서버로 보냄
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (!userId) return;
    e.preventDefault();

    if (!content) {
      alert("댓글 입력해주세요 😀");
      return;
    }
    const data = { content: content };

    JsonConfig("post", `api/comment/${postId}/${userId}`, data, undefined).then((res) => {
      console.log(res);
      setComments([res.data, ...comments]);
    });
    setContent("");
  };

  return (
    <>
      <form className="fixed pb-11 bottom-0 w-full" onSubmit={handleSubmit}>
        <div className="flex items-start gap-2 mx-1 my-4 px-4 py-2.5 rounded-3xl border-2 bg-white">
          <textarea
            className="w-full max-h-12 resize-none focus:outline-none"
            placeholder="댓글을 입력해주세요."
            value={content}
            onChange={handleResizeHeight}
            rows={1}
            wrap="virtual"
          />
          <button
            className={
              content
                ? "text-2xl border-0 focus:outline-0 text-main-400 hover:border-0 focus:outline-none"
                : "text-2xl border-0 focus:outline-0 text-gray-400 hover:border-0 focus:outline-non"
            }
          >
            <IoIosSend />
          </button>
        </div>
      </form>
      <Footer selected={false} userId={userId} />
    </>
  );
};

export default CommentForm;
