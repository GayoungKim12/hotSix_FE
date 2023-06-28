import HeaderDeleteMode from "../../components/Chat/ChatList/HeaderDeleteMode";
import ChatList from "../../components/Chat/ChatList/ChatList";
import { useState } from "react";
import Footer from "../../components/common/Footer";
import ChatListHeader from "../../components/Chat/ChatList/ChatListHeader";

const ChatListPage = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [filter, setFilter] = useState("");
  const userId = localStorage.getItem("accessToken");

  // 삭제 시 배열로 보내줘도 되는지

  const DeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  if (!userId) return <></>;

  return (
    <div className=" flex flex-col w-full h-full bg-main-100 ">
      {isDeleteMode ? (
        <>
          <HeaderDeleteMode DeleteMode={DeleteMode} allSelect={allSelect} setAllSelect={setAllSelect} />
        </>
      ) : (
        <>
          <ChatListHeader DeleteMode={DeleteMode} filter={filter} setFilter={setFilter} />
          <Footer userId={Number(userId)} selected={false} />
        </>
      )}
      <ChatList isDeleteMode={isDeleteMode} allSelect={allSelect} setAllSelect={setAllSelect} filter={filter} />
    </div>
  );
};

export default ChatListPage;
