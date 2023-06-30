import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  selected: boolean;
  userId: number | undefined;
}

const Footer = ({ selected, userId }: Props) => {
  const navigate = useNavigate();

  const moveToHome = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    //스크롤이 먼저 올라가고 메인으로 이동 (스크롤 이벤트 방지)
    setTimeout(() => {
      navigate("/");
    }, 0);
  };
  const moveToCart = () => {
    navigate("/cart");
  };

  const moveToChat = () => {
    navigate("/chatlist");
  };

  const moveToProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="fixed w-full bottom-0 shadow">
      <article className="flex justify-around items-center py-3 bg-white text-indigo-300">
        <HiOutlineUserCircle className="text-3xl cursor-pointer" onClick={moveToProfile} />
        {selected ? (
          <AiFillHeart className="text-3xl text-rose-600 cursor-pointer" onClick={moveToCart} />
        ) : (
          <AiOutlineHeart className="text-3xl cursor-pointer" onClick={moveToCart} />
        )}

        <BsHouse className="text-3xl cursor-pointer" onClick={moveToHome} />
        <TbMessageCircle className="text-3xl cursor-pointer -scale-x-100" onClick={moveToChat} />
      </article>
    </div>
  );
};

export default Footer;
