import { useEffect, useState } from "react";
import {CompatClient, Frame, Stomp, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { getAccessToken, getUserId } from "../../API/TokenAction";

export interface Message {
  chatRoomId: Number;
  senderId: Number;
  message: String;
  createdAt: String;
}

const ChatUtil = () => {
  const [chats, setChats] = useState<Message[]>([]);

  const getChats = () => chats;

  const updateChats = (newChats: Message[]) => {
    console.log(getChats());
    console.log(newChats);
    setChats((prevChats: Message[]) => [...prevChats, ...newChats]);
    console.log(getChats());
  };

  return {
    getChats,
    updateChats,
  };
};

const socketAction = async () => {
  const client = await connectSocket();
    if(client)
    {
      await subscribe(client);
    }

};

const connectSocket = async () => {

  const newClient = Stomp.over(function () {
    return new SockJS("https://www.imnotalone.online/ws");
  });
  if(newClient)
  {
    return newClient;
  }
  
};





const subscribe = async ( client:CompatClient ) => {
  const token = getAccessToken();
  const id = getUserId();
  //let subscription: StompSubscription | null | undefined = null;//채팅방 목록에서 구독해제하려면 이거로 해야할듯?
  console.log(client)
  
  if(client)
  {
    client.connect(
      {
        Authorization: `${token}`,
      },
      (frame: Frame) => {
        if (frame.headers && frame.headers["error"]) {
          const errorCode = frame.headers["error"];
          console.error(`Socket connection failed with error code: ${errorCode}`);
          return;
        }

        async () => {
        console.log("^^")
        client.subscribe(
          `/sub/membership/${id}`,
          (arrivalChat) => {
            const newMessage = JSON.parse(arrivalChat.body) as Message;
            console.log(newMessage);
          }
         
        );
      }
      
    
   
  });
  }

};



export { ChatUtil, socketAction };
