import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

interface ChatListHeaderProps {
  DeleteMode: () => void;
  filter: string;
  setFilter: (value: React.SetStateAction<string>) => void;
}

const ChatListHeader = (props: ChatListHeaderProps) => {
  const navigate = useNavigate();
  const { filter, setFilter } = props;

  const onClickBackBtn = () => {
    navigate(-1);
  };

  /* const onClickTrashBtn = () => {
    DeleteMode();
  }; */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <header className="flex flex-col justify-between">
      <div className="flex justify-between p-4">
        <div className="flex">
          <div className="flex justify-center items-center hover:cursor-pointer" onClick={onClickBackBtn}>
            <IoArrowBackOutline />
          </div>
          <h2 className="ml-4">채팅</h2>
        </div>
        {/* <button className="flex justify-center items-center hover:cursor-pointer hover:border-0 focus:outline-none" onClick={onClickTrashBtn}>
          <BsFillTrash3Fill />
        </button> */}
      </div>
      <input className="p-2 shadow-sm" value={filter} placeholder="닉네임을 입력하세요" onChange={handleChange}></input>
    </header>
  );
};

export default ChatListHeader;
