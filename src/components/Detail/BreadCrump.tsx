import { BsChevronRight } from "react-icons/bs";

const BreadCrump = () => {
  return (
    <ul className="flex gap-2 text-xs">
      <li>홈</li>
      <li className="flex items-center gap-2">
        <BsChevronRight />방 있어요
      </li>
    </ul>
  );
};

export default BreadCrump;
