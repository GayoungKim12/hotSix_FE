import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RxChatBubble } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

const BoardCard = () => {
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="mt-6">
        <div className="relative bg-white rounded-lg m-4 p-4 drop-shadow-xl">
          <section onClick={moveToDetailPage}>
            <article className="flex">
              <div>프로필사진</div>
              <div>
                <div>닉네임:test</div>
                <div>작성날짜 : 2023-06-00</div>{" "}
              </div>
            </article>

            <div className="absolute top-3 right-4 cursor-pointer">
              <BsThreeDots />
            </div>

            <article className="m-4">
              <div>성별 :</div>
              <div>지역 : 강서구</div>
              <div>내용</div>
            </article>
          </section>

          <Carousel />

          <section className="flex justify-between items-center px-4">
            <article className="flex items-center">
              <div className="text-indigo-300">
                <RxChatBubble className="text-2xl" />
              </div>
              <div className="ml-1">count</div>
            </article>

            <article className="flex">
              <span className="text-indigo-300">
                <AiOutlineHeart className="cursor-pointer text-2xl" />
              </span>
              <AiFillHeart className="cursor-pointer text-red-500 text-2xl" />
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
