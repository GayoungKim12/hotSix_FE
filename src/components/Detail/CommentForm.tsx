import { IoIosSend } from "react-icons/io";

const CommentForm = () => {
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <form className="fixed bottom-0 w-full">
      <div className="flex items-start gap-2 mx-3 my-4 px-4 py-2.5 rounded-3xl border-2 bg-white">
        <textarea
          className="w-full max-h-12 resize-none"
          placeholder="댓글을 입력해주세요."
          onChange={handleResizeHeight}
          rows={1}
          wrap="virtual"
        />
        <button className="text-2xl border-0 focus:outline-0 hover:border-0">
          <IoIosSend />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
