import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const CommentForm = () => {
  const [content, setContent] = useState("");

  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) {
      alert("댓글 내용을 선택해주세요.");
      return;
    }
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
