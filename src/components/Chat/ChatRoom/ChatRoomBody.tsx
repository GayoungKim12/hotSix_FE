import { useEffect, useRef, useState } from "react";
import { ChatUtil } from "./ChatUtil";
import { Message } from "./ChatUtil";
import { getAccessToken, getUserId, isTokenValid } from "../../API/TokenAction";
import { get } from "firebase/database";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ChatUtil {
  getChats: () => Message[];
  updateChats: (newChats: Message[]) => void;
}

const ChatRoomBody = ({ chatUtil }: { chatUtil: ChatUtil }) => {
  const userId = getUserId();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLLIElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const { getChats, updateChats } = chatUtil;

  const roomId = Number(useParams().chatRoomId);

  const token = getAccessToken(); 
  const [visibleChats, setVisibleChats] = useState<Message[]>([]);

  const [previousIndex, setpreviousIndex] = useState(0);
  const chats = getChats();


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
            console.log(response.data)
            updateChats(response.data);
            console.log(getChats());//여기서 빈 배열로 나오는 이유가 뭘까??
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    checkTokenValidity();
  }, []);


  useEffect(()=>{
    console.log(chats.length)
    setpreviousIndex(chats.length);
    console.log(previousIndex); //대체 chats.length가 제대로떠도 처음에 0이 나오지...
  },[chats,previousIndex]);


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

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleNewMessage = (newChats: Message[]) => {
      console.log(startIndex)
      const visibleChats = newChats.slice(startIndex);
      setVisibleChats(visibleChats);
    };

    const chats = getChats();
    handleNewMessage(chats);
  }, [getChats, startIndex]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("맨위");
        console.log(getChats());//여기서도 새로 가져오는데 왜 빈배열이 나올까
        //loadPreviousChats();
      }
    });
  };

  const loadPreviousChats = () => {
    console.log(previousIndex);
    if (previousIndex - 40 >= 0) {
      setpreviousIndex((previousIndex: number) => previousIndex - 40);
      setStartIndex((prevStartIndex) => prevStartIndex - 40);
    } else {
      setStartIndex(0);
    }
  };

  return (
    <div ref={chatContainerRef} className="relative flex-grow overflow-hidden" style={{ overflowY: "scroll" }}>
      <div className="w-full h-full">
        <div className="relative flex-grow">
          <div className="h-full overflow-y-auto max-h-full">
            <ul>
              <li ref={startRef}></li>
              {visibleChats.map((message, index) => {
                const isMyChat = message.senderId === userId;
                return <ChatMessage key={index} message={message} isMyChat={isMyChat} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ message, isMyChat }: { message: Message; isMyChat: boolean }) => {
  if (!message) {
    return null;
  } else {
    const targetDate = new Date(message.createdAt as string);
    const hours = targetDate.getHours();
    const minutes = targetDate.getMinutes();

    const messageLength = message.message.length;
    const length = messageLength > 0 ? `w-auto` : "";

    return (
      <li className={`relative h-auto  my-4 flex ${isMyChat ? "flex-row-reverse" : "flex-row"}`} style={{ alignItems: "flex-end" }}>
        {isMyChat ? (
          <>
            <div className={`mr-2 w-1/6 bg-white ${length} break-all`}>
              <span className="mx-1 my-1 rounded-md flex justify-center items-center">{message.message}</span>
            </div>
            <span className="font-light text-sm ml-1">
              {hours}:{minutes}
            </span>
          </>
        ) : (
          <>
            <div className={`ml-4 w-1/6 bg-gray-300 ${length} break-all`}>
              <span className="mx-1 my-1 rounded-md flex justify-center items-center">{message.message}</span>
            </div>
            <span className="font-light text-sm text-right mr-1">
              {hours}:{minutes}
            </span>
          </>
        )}
      </li>
    );
  }
};

export { ChatRoomBody };
