import GoBackButton from "../common/GoBackButton";

const Header = () => {
  return (
    <div>
      <div className="fixed top-0 flex items-center justify-start px-4 w-full h-14 bg-main-100 shadow-md">
        <GoBackButton />
      </div>
    </div>
  );
};

export default Header;
