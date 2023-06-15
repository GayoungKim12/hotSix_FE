import { BiComment } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoKebabHorizontal } from "react-icons/go";
import BreadCrump from "./BreadCrump";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import axios from "axios";

interface DetailProps {
  postId: string;
  handleShow: () => void;
}

interface DetailType {
  user_id: number;
  board_id: number;
  address: string | null;
  content: string;
  created_at: string;
  likes: number;
  like: boolean;
  img_path: string[];
}

const Detail = (props: DetailProps) => {
  const URL = "http://localhost:3001";
  const { postId, handleShow } = props;
  const [postDetail, setPostDetail] = useState<DetailType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${URL}/posts/${postId}`);
        const data = response.data;
        setPostDetail({
          user_id: data.user_id,
          board_id: data.board_id,
          address: data.address,
          content: data.content,
          created_at: data.created_at,
          likes: data.likes,
          like: data.like,
          img_path: data.img_path,
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, setPostDetail]);

  if (!postDetail) return <></>;

  return (
    <>
      <section className="flex flex-col gap-4 items-start p-4 w-full bg-white rounded-b-xl shadow-md text-base">
        <BreadCrump category={postDetail.board_id} />
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 border-2 rounded-full text-black"></div>
            <div>
              <div className="text-base font-semibold text-black">닉네임</div>
              <div className="text-xs text-gray-400">{postDetail.created_at}</div>
            </div>
          </div>
          <button className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200" onClick={handleShow}>
            <GoKebabHorizontal />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 font-semibold">
            <span>{postDetail.address}</span>/<span>성별</span>
          </div>
          <p>{postDetail.content}</p>
        </div>
        <Carousel items={postDetail.img_path} />
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              <BiComment />
            </div>
            <span className="text-base leading-4">{postDetail.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="text-2xl border-0 focus:outline-0 hover:border-0"
              onClick={() => {
                setPostDetail((prev: DetailType | null) => {
                  if (!prev) return null;
                  return { ...prev, like: !prev.like };
                });
              }}
            >
              {postDetail.like ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <span className="text-base leading-4">{postDetail.likes}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
