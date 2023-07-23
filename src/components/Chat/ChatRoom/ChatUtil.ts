import { useState } from "react";
import {CompatClient, Frame, Stomp } from "@stomp/stompjs";
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

  // 다른 컴포넌트에서 chats 상태를 참조할 수 있는 함수

  const getChats = () => chats;

  // 다른 컴포넌트에서 setChats 함수를 호출하여 chats 상태를 업데이트할 수 있는 함수
  const updateChats = (newChats: Message[]) => {
    console.log(getChats());
    console.log(newChats);
    setChats((prevChats: Message[]) => [...prevChats, ...newChats]);//배열을 업데이트 하는 코드
    console.log(getChats());
  };

  return {
    //return해서 다른 컴포넌트에서 쓸수있게 함
    getChats,
    updateChats,
  };
};

const socketAction = async () => {
  const client = await connectSocket();
  console.log(client);
    if(client)
    {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      await subscribe(client);
    }
    else{
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    }

};

const connectSocket = async () => {

  const newClient = Stomp.over(function () {
    return new SockJS("https://www.imnotalone.online/ws");
  });
  console.log(newClient,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
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
