import { Frame, StompHeaders, StompSubscription } from "@stomp/stompjs";

import React, { useEffect, useRef } from "react";

import { getAccessToken, getUserId, isTokenValid } from "../../API/TokenAction";

import { Message } from "./ChatUtil";


import { useParams } from "react-router-dom";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";

interface ChatUtil {
  getChats: () => Message[];
  updateChats: (newChats: Message[]) => void;
}

const ChatInput2 = ({ chatUtil }: { chatUtil: ChatUtil }) => {
  const newChatRef = useRef<HTMLInputElement>(null);
  const {getChats, updateChats } = chatUtil;
  let subscription: StompSubscription | null | undefined = null;
  // const client = connectSocket(); //이건 원래 여기서 하는게 아님(소켓연결 자체는 로그인 하자마자 함)

  const roomId = Number(useParams().chatRoomId);

  const userId = getUserId();
  //const userId =11;
  //console.log(roomId)
  const token = getAccessToken();


  // const client = Stomp.over(function () {
  //       return new SockJS("http://localhost:8080/ws");
  //   });
  const client = useRef(Stomp.over(function () {
    return new SockJS("https://www.imnotalone.online/ws");
  }));

  useEffect(() => {
    // console.log("채팅방입장")
    const connectSocket = () => {
      client.current.connect(
        {
          Authorization: `${token}`,
        },
        (frame: Frame) => {
          if (frame.headers && frame.headers["error"]) {
            const errorCode = frame.headers["error"];
            console.error(`Socket connection failed with error code: ${errorCode}`);
            return;
          }

          subscription=  client.current.subscribe(
            `/sub/room/${roomId}`,
            (arrivalChat) => {
              const newMessage = JSON.parse(arrivalChat.body) as Message;
              updateChats([newMessage]);
            },
          );
        }
      );
    };

    connectSocket();

   

    return () => {
      console.log("채팅방나감");
      if (client.current) {
        subscription?.unsubscribe();
        
        
      }
  };

  }, []);


  useEffect(() => {
    console.log("채팅방입장 3")
    const checkTokenValidity = async () => {
      const isValid = await isTokenValid();
      if (isValid) {
        axios({
          method: "get",
          url: `https://www.imnotalone.online/api/chat/room/${roomId}`,
          headers: {
            Authorization: `${token}`,
          },
        })
          .then((response) => {
            console.log("이전기록요청성공!!");

            updateChats(response.data);
            console.log(getChats()); 
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

  const sendMessage = () => {
    if (newChatRef.current && newChatRef.current.value !== "" && roomId) {
      const now = new Date();
      const inputValue = newChatRef.current.value;

      const messageData: Message = {
        chatRoomId: roomId,
        senderId: userId,
        message: inputValue,
        createdAt: new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString(),
      };

      const headers = new StompHeaders();
      headers["content-type"] = "application/json";
      headers["Authorization"] = `${token}`;

      try {
        if (token) {
          client.current.publish({
            destination: "/pub/chat/send",
            headers: headers,
            body: JSON.stringify(messageData),
          });

          newChatRef.current.value = ""; // 입력 필드 초기화
        }
      } catch (error) {
        console.log("에러났음!!");
        console.error(error);
      }
    }
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };


  return (
    <div className="bottom-0 h-12 chat-input-container ">
      <div className="flex justify-between items-center  ">
        <input ref={newChatRef} onKeyDown={pressEnter} className="h-12 w-full px-4 rounded-l-2xl" placeholder="채팅을 입력" />
        <button onClick={sendMessage} className="rounded-r-2xl h-12 w-10 bg-white  border-black border-l-2  ">
          확인
        </button>
      </div>
    </div>
  );
};



export default ChatInput2;