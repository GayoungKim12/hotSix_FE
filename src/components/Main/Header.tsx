import { BiBell } from "react-icons/bi";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center px-3 py-3 ">
      <img src="../../public/logo.png" className="w-20" />
      <div className="px-3 py-3 text-2xl">
        <BiBell />
      </div>{" "}
    </div>
  );
};

export default Header;
