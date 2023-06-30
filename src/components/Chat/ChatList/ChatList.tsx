import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import { JsonConfig } from "../../API/AxiosModule";

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
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);

  const [chatRooms, setChatRooms] = useState<ChatRoomType[] | null>(null);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [chatRoomList, setChatRoomList] = useState<ChatRoomType[] | null>(null);
  const { allSelect, isDeleteMode, setAllSelect, filter } = props;

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
    if (filter === "" || isDeleteMode) {
      setChatRoomList(chatRooms);
    } else {
      const filterList = chatRooms.filter((room) => room.partner.nickname.includes(filter));
      setChatRoomList(filterList);
    }
  }, [chatRooms, filter, isDeleteMode]);

  const getChatRooms = async (userId: number | null) => {
    if (!userId) return null;
    console.log("실행");
    try {
      const response = await JsonConfig("get", `api/chat/room`, null, { memberId: userId });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("채팅방 목록을 가져오는 중에 에러가 발생했습니다:", error);
      throw error;
    }
  };

  const { data, refetch } = useQuery(
    ["chatRooms", userId],
    async () => await getChatRooms(userId),
    { refetchInterval: 5000 } // 5초마다 데이터 갱신
  );

  // chatRooms 데이터 업데이트 시 실행되는 부분
  useEffect(() => {
    setChatRooms(data);
  }, [data]);

  // 컴포넌트 렌더링 후 초기 데이터 요청
  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [refetch, userId]);

  // deleteMode가 실행되면 deleteList 초기화
  useEffect(() => {
    if (isDeleteMode) {
      setDeleteList([]);
    }
  }, [isDeleteMode]);

  useEffect(() => {
    if (!isDeleteMode) return;
    if (chatRoomList && allSelect) {
      const newDeleteList = chatRoomList.map((chatRoom) => chatRoom.chatRoomId);
      setDeleteList(newDeleteList);
    }
  }, [allSelect, chatRoomList, isDeleteMode]);

  useEffect(() => {
    if (chatRoomList && chatRoomList.length === deleteList.length && !allSelect) {
      setAllSelect(true);
    }
  }, [allSelect, chatRoomList, deleteList.length, setAllSelect]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      /* await JsonConfig("put", `api/chat/room/${userId}`, {
        chatroomId: deleteList,
        senderId: userId,
      }); */
      setChatRooms((prev: ChatRoomType[] | null) => {
        if (!prev) return null;
        return prev.filter((room) => {
          return !deleteList.includes(room.chatRoomId);
        });
      });
      setDeleteList([]);
      //setIsDeleteMode(false)
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
                isDeleteMode={isDeleteMode}
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
