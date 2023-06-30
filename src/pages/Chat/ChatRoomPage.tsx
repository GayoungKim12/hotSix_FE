import { ChatRoomHeader } from "../../components/Chat/ChatRoom/ChatRoomHeader";
import ChatInput2 from "../../components/Chat/ChatRoom/ChatInput2";
import { ChatRoomBody } from "../../components/Chat/ChatRoom/ChatRoomBody";
import { ChatUtil } from "../../components/Chat/ChatRoom/ChatUtil";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../components/API/TokenAction";

// axios로 이전 기록 가져오는게 어떤방법을써도 완성된채로 chatroom페이지를 렌더링 시작하는게 안된다.(gpt도 모름)

// 처음엔 3단계로 나누려고 했다.
// 이전기록 렌더링하는함수, 새로온 메시지 렌더링하는 함수, 위로 스크롤하면 이전기록 20개 정도 더 렌더링 하는 함수

// 근데 기록 업데이트가 바로 되는게 아니라서 그냥 새 메시지 받을때마다 chats가져와서 렌더링 하는 걸로 만들었다.
// 이러면 전체기록이 한꺼번에 보인다.

// async function fetchChatData(roomId, token, updateChats) {
//   try {
//     const response = await axios({
//       method: "get",
//       url: `http://43.200.78.88:8080/api/chat/room/${roomId}`,
//       headers: {
//         Authorization: `${token}`,
//       },
//     });
//     updateChats(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

function ChatRoomPage() {
  const chatUtil = ChatUtil();
  const roomId = Number(useParams().chatRoomId); // 테스트
  const { getChats, updateChats } = chatUtil;
  const token = getAccessToken(); // 테스트

  // useEffect(() => {
  //   fetchChatData(roomId, token, updateChats);
  // }, []);

  return (
    <div className="absolute flex flex-col w-full h-screen bg-main-100">
      <ChatRoomHeader />
      <ChatRoomBody chatUtil={chatUtil} />
      <ChatInput2 chatUtil={chatUtil} />
    </div>
  );
}

export default ChatRoomPage;
