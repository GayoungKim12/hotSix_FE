import SockJS from "sockjs-client/dist/sockjs";
import { useRef, useState } from "react";
import { CompatClient, Stomp, IMessage, StompHeaders } from "@stomp/stompjs";
import { getAccessToken } from "../../API/TokenAction";

export interface Message {
  chatRoomId: Number;
  senderId: Number;
  message: String;
  createdAt: String;
}

const connectSocket = () => {
  const stompClient = Stomp.over(function () {
    return new SockJS("http://43.200.78.88:8080/ws");
  });
  return stompClient;
};

const ChatUtil = () => {
  const [chats, setChats] = useState<Message[]>([]);

  // 다른 컴포넌트에서 chats 상태를 참조할 수 있는 함수

  const getChats = () => chats;

  // 다른 컴포넌트에서 setChats 함수를 호출하여 chats 상태를 업데이트할 수 있는 함수
  const updateChats = (newChats: Message[]) => {
    setChats((prevChats: Message[]) => [...prevChats, ...newChats]);
  };

  return {
    //return해서 다른 컴포넌트에서 쓸수있게 함
    getChats,
    updateChats,
  };
};

//방id도 여기서 넘겨주기 ? 굳이?
//그외에도 공통적으로 사용하는건 여기서
export { ChatUtil, connectSocket };
