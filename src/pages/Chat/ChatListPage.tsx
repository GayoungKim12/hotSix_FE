import HeaderDeleteMode from "../../components/Chat/ChatList/HeaderDeleteMode";
import ChatList from "../../components/Chat/ChatList/ChatList";
import { useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import ChatListHeader from "../../components/Chat/ChatList/ChatListHeader";
import jwtDecode from "jwt-decode";

const ChatListPage = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [filter, setFilter] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<{ id: string }>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  const DeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  if (!userId) return <></>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-main-100">
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
