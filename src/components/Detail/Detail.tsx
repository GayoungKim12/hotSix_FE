import { BiComment } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoKebabHorizontal } from "react-icons/go";
import BreadCrump from "./BreadCrump";
import Carousel from "./Carousel";
import { useState } from "react";

interface DetailProps {
  handleShow: () => void;
}

const Detail = (props: DetailProps) => {
  const [like, setLike] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-4 items-start p-4 w-full bg-white rounded-b-xl shadow-md text-base">
        <BreadCrump category={2} />
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 border-2 rounded-full text-black"></div>
            <div>
              <div className="text-base font-semibold text-black">닉네임</div>
              <div className="text-xs text-gray-400">2023-06-03</div>
            </div>
          </div>
          <button
            className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
            onClick={props.handleShow}
          >
            <GoKebabHorizontal />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 font-semibold">
            <span>지역</span>/<span>성별</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eius? Fugit tempore officiis quaerat
            beatae! Illum, aliquid? Exercitationem consequatur deserunt voluptates harum accusamus, possimus sint quam
            dolorem saepe quas odit!
          </p>
        </div>
        <Carousel />
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              <BiComment />
            </div>
            <span className="text-base leading-4">13</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-2xl border-0 focus:outline-0 hover:border-0" onClick={() => setLike(!like)}>
              {like ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <span className="text-base leading-4">14</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
