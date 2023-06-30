import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const moveToHome = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    //스크롤이 먼저 올라가고 메인으로 이동 (스크롤 이벤트 방지)
    setTimeout(() => {
      navigate("/");
    }, 0);
  };
  return (
    <div className="fixed w-full z-20 top-0 left-0 shadow bg-main-100">
      <div className="flex flex-row justify-between items-center px-3 py-3 ">
        <img src="../../public/logo.png" className="w-20 cursor-pointer" onClick={moveToHome} />
      </div>
    </div>
  );
};

export default Header;
