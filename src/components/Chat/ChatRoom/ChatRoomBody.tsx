import { useEffect, useRef, useState } from "react";
import { ChatUtil } from "./ChatUtil";
import { Message } from "./ChatUtil";
import { getAccessToken, getUserId, isTokenValid } from "../../API/TokenAction";

import { useParams } from "react-router-dom";
import axios from "axios";
import { partnerInfo } from "../../../pages/Chat/ChatRoomPage";

interface ChatUtil {
  getChats: () => Message[];
  updateChats: (newChats: Message[]) => void;
}

const ChatRoomBody = ({ chatUtil, partnerInfomation }: { chatUtil: ChatUtil; partnerInfomation: partnerInfo }) => {
  const userId = getUserId();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLLIElement>(null);
  const endRef = useRef<HTMLLIElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const { getChats, updateChats } = chatUtil;
  const roomId = Number(useParams().chatRoomId);
  const token = getAccessToken();
  const [visibleChats, setVisibleChats] = useState<Message[]>([]);
  const [previousIndex, setpreviousIndex] = useState(0);
  const chats = getChats();

  const [imgPath, setImgPath] = useState("");
  const [nickname, setNickname] = useState("null");

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await isTokenValid();
      if (isValid) {
        axios({
          method: "get",
          url: `http://43.200.78.88:8080/api/chat/room/${roomId}`,
          headers: {
            Authorization: `${token}`,
          },
        })
          .then((response) => {
            console.log("이전기록요청성공!!");
            //console.log(response.data)
            updateChats(response.data);
            console.log(getChats()); //여기서 빈 배열로 나오는 이유가 뭘까??
          })
          .catch((error) => {
            console.error(error);
          });
        console.log("^^^^^^^^^^^^^^^^");
        console.log(getChats());
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    if (partnerInfomation.nickname !== null) {
      setImgPath(partnerInfomation.imgPath);
      //setNickname("ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ")
      setNickname(partnerInfomation.nickname);
    }
  }, [partnerInfomation]);

  useEffect(() => {
    if (getChats().length > 0) {
      //console.log(getChats());
      console.log(getChats().length);
      setpreviousIndex(chats.length);
      //console.log(previousIndex); //대체 chats.length가 제대로떠도 처음에 0이 나오지...
    }
  }, [getChats()]);

  useEffect(() => {
    console.log(chats.length);
    setpreviousIndex(chats.length);
    //console.log(previousIndex); //대체 chats.length가 제대로떠도 처음에 0이 나오지...
  }, [chats, previousIndex]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleChats]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (startRef.current) {
      observer.observe(startRef.current);
    }
    if (endRef.current) {
      observer.observe(endRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleNewMessage = (newChats: Message[]) => {
      //console.log(startIndex)
      const visibleChats = newChats.slice(startIndex);
      setVisibleChats(visibleChats);
    };

    const chats = getChats();
    if (getChats().length > 0) {
      handleNewMessage(chats);
    }
  }, [getChats(), startIndex]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //스크롤이 화면 맨위로 올라갔을때

        console.log(getChats().length);
        console.log(getChats()); //여기서도 새로 가져오는데 왜 빈배열이 나올까
        //loadPreviousChats();
      }
    });
  };

  // const loadPreviousChats = () => {
  //   console.log(previousIndex);
  //   if (previousIndex - 40 >= 0) {
  //     setpreviousIndex((previousIndex: number) => previousIndex - 40);
  //     setStartIndex((prevStartIndex) => prevStartIndex - 40);
  //   } else {
  //     setStartIndex(0);
  //   }
  // };

  return (
    <div ref={chatContainerRef} className="relative flex-grow overflow-hidden" style={{ overflowY: "scroll" }}>
      <div className="w-full h-full">
        <div className="relative flex-grow">
          <div className="h-full overflow-y-auto max-h-full">
            <ul>
              <li ref={startRef}></li>
              {visibleChats.map((message, index) => {
                /////////////////날짜 표시하는 로직
                let targetDay = -1;
                let targetMonth = -1;
                if (index === 0) {
                  targetDay = new Date(chats[index].createdAt as string).getDay();
                  targetMonth = new Date(chats[index].createdAt as string).getMonth();
                }
                if (index !== chats.length - 1) {
                  const isCreated = new Date(chats[index].createdAt as string).getDay();
                  const nextCreated = new Date(chats[index + 1].createdAt as string).getDay();
                  if (isCreated !== nextCreated) {
                    targetDay = new Date(chats[index + 1].createdAt as string).getDay();
                    targetMonth = new Date(chats[index + 1].createdAt as string).getMonth();
                  }
                }
                ////////내 채팅이면 true 상대채팅이면 false
                const isMyChat = message.senderId === userId;
                return (
                  <ChatMessage
                    key={index}
                    message={message}
                    targetDay={targetDay}
                    targetMonth={targetMonth}
                    imgPath={imgPath}
                    nickname={nickname}
                    isMyChat={isMyChat}
                  />
                );
              })}
              <li ref={endRef}></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({
  message,
  isMyChat,
  imgPath,
  nickname,
  targetDay,
  targetMonth,
}: {
  targetMonth: number;
  targetDay: number;
  message: Message;
  isMyChat: boolean;
  imgPath: string;
  nickname: string;
}) => {
  if (!message) {
    return null;
  } else {
    const targetDate = new Date(message.createdAt as string);
    let isSameDay = true;
    if (targetDay !== -1) {
      isSameDay = false;
    }
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();
    return (
      <>
        {!isSameDay ? (
          <div className="text-center">
            {targetMonth}월{targetDay}일
          </div>
        ) : null}
        <li className={`relative h-auto my-4 flex items-end ${isMyChat ? "flex-row-reverse" : "flex-row"}`}>
          {isMyChat ? (
            <>
              <span className="bg-white px-3 py-1 max-w-4/5 inline-flex flex-col break-all mx-1 my-1 rounded-md flex justify-center items-center">
                {message.message}
              </span>
              <span className="font-light text-sm ml-1">
                {hours}:{minutes}
              </span>
            </>
          ) : (
            <>
              <img className="ml-1 w-12 h-12 border-2 rounded-full" src={imgPath} alt="" />
              <div className="ml-4 max-w-4/5">
                <div className="mb-1">{nickname}</div>
                <span className="inline-flex flex-col mx-1 my-1 px-1 py-1 bg-gray-300 break-all  rounded-md ">{message.message}</span>
                <span className="font-light text-sm mr-1">
                  {hours}:{minutes}
                </span>
              </div>
            </>
          )}
        </li>
      </>
    );
  }
};

export { ChatRoomBody };
