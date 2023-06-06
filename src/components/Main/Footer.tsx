import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsHouse } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { TbMessageCircle } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const moveToSearch = () => {
    navigate("/search");
  };

  const moveToHome = () => {
    navigate("/");
  };
  return (
    <div className="fixed w-full bottom-0 shadow">
      <article className="flex justify-around items-center py-3 bg-white text-indigo-300">
        <HiOutlineUserCircle className="text-3xl cursor-pointer" />
        <AiOutlineHeart className="text-3xl cursor-pointer" />
        <BsHouse className="text-3xl cursor-pointer" onClick={moveToHome} />
        <CiSearch className="text-3xl cursor-pointer" onClick={moveToSearch} />
        <TbMessageCircle className="text-3xl cursor-pointer" />
      </article>
    </div>
  );
};

export default Footer;
