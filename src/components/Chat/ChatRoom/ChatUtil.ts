import { useState } from "react";
import {CompatClient, Frame, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { getAccessToken, getUserId } from "../../API/TokenAction";
import { atom, useAtom } from "jotai";

export interface Message {
  chatRoomId: Number;
  senderId: Number;
  message: String;
  createdAt: String;
}



const ChatUtil = () => {
  const [chats, setChats] = useState<Message[]>([]);

  const chatAtom = atom<Message | null>(null);
  const useChatAtom = () => useAtom(chatAtom);

  const [arrivalChat, setArrivalChat] = useChatAtom();

  const getChats = () => chats;

  const getArrivalChats = () => arrivalChat;


  const updateChats = (newChats: Message[]) => {
    console.log(getChats());
    console.log(newChats);
    setChats((prevChats: Message[]) => [...prevChats, ...newChats]);
    console.log(getChats());
  };

  const updateChat = (newChats: Message) => {
    setArrivalChat(newChats);
  };

  return {
    getChats,
    updateChats,
    getArrivalChats,
    updateChat,
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
  //const { getArrivalChats,updateChat } = ChatUtil();
  
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
           //updateChat(newMessage);
           //console.log(getArrivalChats)
          }
         
        );
      }
      
    
   
  });
  }

};



export { ChatUtil, socketAction };
