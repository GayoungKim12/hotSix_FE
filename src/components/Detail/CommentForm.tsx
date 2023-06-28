import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const CommentForm = ({ postId, comments, setComments }) => {
  const [userId, setUserId] = useState();
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
    if (!userId) return;
    e.preventDefault();

    if (!content) {
      alert("댓글 입력해주세요 😀");
      return;
    }
    const data = { content: content };
    axios
      .post(`http://43.200.78.88:8080/api/comment/${postId}/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setComments([res.data, ...comments]);
      });
    setContent("");
  };

  return (
    <form className="fixed bottom-0 w-full" onSubmit={handleSubmit}>
      <div className="flex items-start gap-2 mx-3 my-4 px-4 py-2.5 rounded-3xl border-2 bg-white">
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
  );
};

export default CommentForm;
