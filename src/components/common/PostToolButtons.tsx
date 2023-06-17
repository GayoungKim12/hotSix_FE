import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PostToolButtonsProps {
  postId: string;
  handleShow: () => void;
}

const PostToolButtons = (props: PostToolButtonsProps) => {
  const URL = "http://43.200.78.88:8080";
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { postId, handleShow } = props;

  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        url: `${URL}/post/${postId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("성공");
    } catch (err) {
      console.log("실패");
    }
  };

  return (
    <div onClick={handleShow}>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-30" />
      <div className="fixed bottom-4 flex flex-col items-center z-50 w-full text-md">
        <div className="mb-2 w-11/12 rounded-xl bg-white shadow opacity-80">
          <button className="block px-4 py-3 w-full border-0 border-b-2 border-gray-200 rounded-t-xl rounded-b-none hover:border-gray-200 focus:outline-none">
            끌어올리기
          </button>
          <button
            className="block px-4 py-3 w-full border-0 border-b-2 border-gray-200 rounded-none hover:border-gray-200 focus:outline-none"
            onClick={() => navigate(`/edit/${postId}`)}
          >
            게시물 수정
          </button>
          <button
            className="block px-4 py-3 w-full border-0 rounded-t-none rounded-b-xl hover:border-0 focus:outline-none"
            onClick={deletePost}
          >
            게시물 삭제
          </button>
        </div>
        <button className="px-4 py-3 w-11/12 border-0 rounded-xl shadow bg-white hover:border-0 focus:outline-none">
          닫기
        </button>
      </div>
    </div>
  );
};

export default PostToolButtons;
