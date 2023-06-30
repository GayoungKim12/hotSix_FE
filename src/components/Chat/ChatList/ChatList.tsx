import { useCallback, useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import jwtDecode from "jwt-decode";
import axios from "axios";

interface ChatListProps {
  isDeleteMode: boolean;
  allSelect: boolean;
  setAllSelect: (value: React.SetStateAction<boolean>) => void;
  filter: string;
}

interface DecodedToken {
  id: string;
}

interface ChatRoomType {
  lastMessage: string;
  partner: {
    membershipId: number;
    imgPath: string;
    nickname: string;
  };
  chatRoomId: number;
  lastTime: string;
}

const ChatList = (props: ChatListProps) => {
  const URL = "http://43.200.78.88:8080";
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);

  const [chatRooms, setChatRooms] = useState<ChatRoomType[] | null>(null);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const { allSelect, isDeleteMode, setAllSelect, filter } = props;
  const [chatRoomList, setChatRoomList] = useState<ChatRoomType[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  useEffect(() => {
    if (!chatRooms) return;
    console.log(filter);
    if (filter === "") {
      setChatRoomList(chatRooms);
    } else {
      const filterList = chatRooms.filter((room) => room.partner.nickname.includes(filter));
      console.log(filterList);
      setChatRoomList(filterList);
    }
  }, [chatRooms, filter]);

  const getChatRooms = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios({
        url: `${URL}/api/chat/room`,
        method: "get",
        headers: {
          Authorization: `${accessToken}`,
        },
        params: {
          memberId: `${userId}`,
        },
      });
      console.log(response);
      setChatRooms(response.data);
    } catch (error) {
      console.error("채팅방 목록을 가져오는 중에 에러가 발생했습니다:", error);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    getChatRooms();
  }, [getChatRooms]);

  useEffect(() => {
    if (isDeleteMode) {
      setDeleteList([]);
    }
  }, [isDeleteMode]);

  useEffect(() => {
    if (chatRooms && allSelect) {
      const newDeleteList = chatRooms.map((chatRoom) => chatRoom.chatRoomId);
      setDeleteList(newDeleteList);
    }
  }, [allSelect, chatRooms]);

  useEffect(() => {
    if (chatRooms && chatRooms.length === deleteList.length && !allSelect) {
      setAllSelect(true);
    }
  }, [allSelect, chatRooms, deleteList.length, setAllSelect]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await axios({
        method: "put",
        url: `${URL}/api/chat/room/${userId}`,
        headers: {
          Authorization: `${accessToken}`,
        },
        data: {
          chatroomId: deleteList,
          senderId: userId,
        },
      });
      setChatRooms((prev: ChatRoomType[] | null) => {
        if (!prev) return null;
        return prev.filter((room) => {
          return !deleteList.includes(room.chatRoomId);
        });
      });
      setDeleteList([]);
    } catch (err) {
      console.log(err);
    }
  };

  if (!userId) return <></>;

  return (
    <>
      <div className="flex flex-col">
        {chatRoomList &&
          chatRoomList.map((chat) => {
            return (
              <ChatRoom
                key={chat.chatRoomId}
                chat={chat}
                allSelect={allSelect}
                setAllSelect={setAllSelect}
                isDeleteMode={props.isDeleteMode}
                setDeleteList={setDeleteList}
              />
            );
          })}
      </div>
      {props.isDeleteMode && (
        <button className="fixed z-10 w-full h-12 bottom-0 bg-main-400 rounded-none text-white focus:outline-none" onClick={handleDelete}>
          삭제
        </button>
      )}
    </>
  );
};

export default ChatList;
