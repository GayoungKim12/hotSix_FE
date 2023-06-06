import { GoKebabHorizontal } from "react-icons/go";

interface CommentProps {
  handleShow: () => void;
}

const Comment = (props: CommentProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 p-4 border-b-2">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 border-2 rounded-full text-black"></div>
            <div className="text-base font-semibold text-black">닉네임</div>
          </div>
          <button
            className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
            onClick={props.handleShow}
          >
            <GoKebabHorizontal />
          </button>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex items-start justify-between w-full">
          <div className="text-xs text-gray-400">2023-06-03</div>
        </div>
      </div>
    </>
  );
};

export default Comment;
