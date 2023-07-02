import { Frame, StompHeaders } from "@stomp/stompjs";

import React, { useEffect, useRef } from "react";

import { getAccessToken, getUserId, isTokenValid } from "../../API/TokenAction";

import { Message } from "./ChatUtil";

import { connectSocket } from "./ChatUtil";
import { useParams } from "react-router-dom";

interface ChatUtil {
  getChats: () => Message[];
  updateChats: (newChats: Message[]) => void;
}

const ChatInput2 = ({ chatUtil }: { chatUtil: ChatUtil }) => {
  const newChatRef = useRef<HTMLInputElement>(null);
  const { updateChats } = chatUtil;
  //let subscription: StompSubscription | null | undefined = null;
  const client = connectSocket(); //이건 원래 여기서 하는게 아님(소켓연결 자체는 로그인 하자마자 함)

  const roomId = Number(useParams().chatRoomId);

  const userId = getUserId();
  //const userId =11;
  //console.log(roomId)
  const token = getAccessToken();

  useEffect(() => {
    // console.log("채팅방입장")

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

        //연결에 성공하면 밑에코드 실행
        //console.log("연결성공")
        //subscription =
        client.subscribe(
          //구독해서 앞으로 이 url로 메시지오면
          `/sub/room/${roomId}`,
          (arrivalChat) => {
            //console.log("메시지왔음")
            //console.log(arrivalChat);
            const newMessage = JSON.parse(arrivalChat.body) as Message;
            //console.log(newMessage);

            updateChats([newMessage]); //CHATAS 업데이트
          }
        );

        //console.log("이전기록요청")

        // axios({
        //   method: "get",
        //   url: `http://43.200.78.88:8080/api/chat/room/${roomId}`,
        //   headers: {
        //     Authorization: `${token}`,
        //   },
        // })
        //   .then((response) => {
        //     //console.log("이전기록요청성공!!")
        //     //console.log(response);
        //     updateChats(response.data);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    );
    // console.log(client.connected)
    return () => {
      console.log("채팅방나감");
      // if(subscription)
      // {
      //     subscription.unsubscribe();
      //     axios.put(`/sub/room/${roomId}`,[ {
      //       "chatroomId": roomId,
      //       "senderId": userId,
      //    }])
      // }
    };
  }, []);

  const sendMessage = async () => {
    const checkTokenValidity = async () => {
      const isValid = await isTokenValid();
      if (isValid) {
        if (newChatRef.current !== null && userId) {
          if (!client.connected) {
            // console.log("재연결함");
            client.connect(
              {
                Authorization: `${token}`,
              },
              (frame: Frame) => {
                if (frame.headers && frame.headers["error"]) {
                  const errorCode = frame.headers["error"];
                  console.log("^^^");
                  console.error(`Socket connection failed with error code: ${errorCode}`);
                  return;
                } else {
                  sendChatMessage();
                }
              }
            );
          } else {
            sendChatMessage();
          }
        }
      }
    };
    checkTokenValidity();
  };

  const sendChatMessage = async () => {
    if (newChatRef.current) {
      if (newChatRef.current.value !== "" && roomId) {
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
            client.publish({
              destination: "/pub/chat/send",
              headers: headers,
              body: JSON.stringify(messageData),
            });
            // console.log(messageData);

            // updateChats([messageData]);//테스트(지워야함)

            newChatRef.current.value = ""; // 입력 필드 초기화
          }
        } catch (error) {
          console.log("에러났음!!");
          console.error(error);
        }
      }
    }

    // console.log(client.connected)
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Enter쳤으면 메시지보내기
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bottom-0 h-12 chat-input-container ">
      <div className="flex items-center justify-between ">
        <label className="z-10 rounded-l-2xl h-12 w-8 bg-white ">
          <input type="file" accept="image/*" className="hidden " />
          <span className="relative top-3 left-1">img</span>
        </label>
        <input ref={newChatRef} onKeyDown={pressEnter} className="h-12 w-full px-4 " placeholder="채팅을 입력" />
        <button onClick={sendMessage} className="rounded-r-2xl h-12 w-10 bg-white  border-black border-l-2  ">
          확인
        </button>
      </div>
    </div>
  );
};

export default ChatInput2;
