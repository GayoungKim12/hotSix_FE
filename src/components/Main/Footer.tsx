import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  selected: boolean;
}

const Footer = ({ selected }: Props) => {
  const navigate = useNavigate();

  const moveToHome = () => {
    navigate("/");
  };
  const moveToCart = () => {
    navigate("/cart");
  };

  const moveToChat = () => {
    navigate("/ChatListPage");
  };

  return (
    <div className="fixed w-full bottom-0 shadow">
      <article className="flex justify-around items-center py-3 bg-white text-indigo-300">
        <HiOutlineUserCircle className="text-3xl cursor-pointer" />
        {selected ? (
          <AiFillHeart
            className="text-3xl cursor-pointer"
            onClick={moveToCart}
          />
        ) : (
          <AiOutlineHeart
            className="text-3xl cursor-pointer"
            onClick={moveToCart}
          />
        )}

        <BsHouse className="text-3xl cursor-pointer" onClick={moveToHome} />
        {/* <CiSearch className="text-3xl cursor-pointer" onClick={moveToSearch} /> */}
        <TbMessageCircle
          className="text-3xl cursor-pointer -scale-x-100"
          onClick={moveToChat}
        />
      </article>
    </div>
  );
};

export default Footer;
