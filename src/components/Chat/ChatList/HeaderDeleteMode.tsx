import { IoArrowBackOutline } from "react-icons/io5";

interface HeaderDeleteModeProps {
  DeleteMode: () => void;
  allSelect: boolean;
  setAllSelect: (value: React.SetStateAction<boolean>) => void;
}

const HeaderDeleteMode = (props: HeaderDeleteModeProps) => {
  const { DeleteMode, allSelect, setAllSelect } = props;

  const onClickBackBtn = () => {
    DeleteMode();
  };

  const onClickAllSelect = () => {
    setAllSelect(true);
  };

  return (
    <div className="flex justify-between items-center h-14 px-4 py-2 shadow-md">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="flex justify-center hover:cursor-pointer" onClick={onClickBackBtn}>
            <IoArrowBackOutline />
          </div>
          <h2 className="ml-4">채팅</h2>
        </div>
      </div>
      {!allSelect && (
        <button className="px-2 py-0.5 bg-main-400 text-white font-light" onClick={onClickAllSelect}>
          전체선택
        </button>
      )}
    </div>
  );
};

export default HeaderDeleteMode;
