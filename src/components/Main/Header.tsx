import { BiBell } from "react-icons/bi";

const Header = () => {
  return (
    <div className="fixed w-full z-20 top-0 left-0 shadow bg-main-100">
      <div className="flex flex-row justify-between items-center px-3 py-3 ">
        <img src="../../public/logo.png" className="w-20" />
        <div className="px-3 py-3 text-2xl">
          <BiBell />
        </div>{" "}
      </div>
    </div>
  );
};

export default Header;
