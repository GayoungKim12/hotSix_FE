import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import { GoKebabHorizontal } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  setShowPostButtons: React.Dispatch<React.SetStateAction<boolean>>;
  board: {
    id: number;
    nick_name: string;
    address: string;
    likes: boolean;
  };
}

const BoardCard: React.FC<Props> = ({ setShowPostButtons, board }: Props) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const moveToDetailPage = () => {
    navigate("/detail");
  };
  const PostButtonOpen = () => {
    setShowPostButtons(true);
  };

  //like값 최신화
  useEffect(() => {
    setLike(board.likes);
  }, [board.likes]);

  const onClickHeart = () => {
    const id = board.id;
    if (!like) {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/postProjectionMainDtoList/${id}`,
        data: {
          likes: true,
        },
      }).then((response) => {
        setLike(response.data.likes);
      });
    } else if (like) {
      axios({
        method: "PATCH",
        url: `http://localhost:3001/postProjectionMainDtoList/${id}`,
        data: {
          likes: false,
        },
      }).then((response) => setLike(response.data.likes));
    }
  };

  return (
    <>
      <div className="mt-6">
        <div className="relative bg-white rounded-lg m-4 p-4 drop-shadow-xl">
          <section className="cursor-pointer">
            <article className="flex">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 border-2 rounded-full text-black"></div>
                  <div>
                    <div className="text-base font-semibold text-black">
                      {board.nick_name}
                    </div>
                    <div className="text-xs text-gray-400">2023-06-03</div>
                  </div>
                </div>
                <button
                  className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
                  onClick={PostButtonOpen}
                >
                  <GoKebabHorizontal />
                </button>
              </div>
            </article>

            <article className="m-4" onClick={moveToDetailPage}>
              <div>성별 :</div>
              <div>지역 : {board.address}</div>
              <div>내용</div>
            </article>
          </section>

          <Carousel />

          <section className="flex justify-between items-center px-1">
            <article className="flex items-center">
              <div className="text-indigo-300">
                <BiComment className="text-2xl" />
              </div>
              <div className="ml-1">count</div>
            </article>

            <article className="flex">
              {like ? (
                <AiFillHeart
                  className="cursor-pointer text-red-500 text-2xl"
                  onClick={onClickHeart}
                />
              ) : (
                <span className="text-indigo-300">
                  <AiOutlineHeart
                    className="cursor-pointer text-2xl"
                    onClick={onClickHeart}
                  />
                </span>
              )}
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
