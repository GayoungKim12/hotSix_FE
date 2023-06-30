// import React, {useState, useEffect} from 'react';

// import queryString from 'query-string';

// import io from 'socket.io-client';

// import { atom , useAtom ,useAtomValue} from 'jotai'
// import { getAccessToken } from './TokenAction';

// const accessToken = getAccessToken();

// const socket =io("http://43.200.78.88:8080/messages",{
//     auth:{token:accessToken}
// });

// export const socketAtom = atom(socket);

// const socketEventHandler =() =>{ //이벤트 핸들러 등록
//     socket.on("connect", () => { //정상적인 연결
//         console.log("연결성공");
//         console.log(socket.id);
//         });

//     socket.on("connect_error", () => {//소켓이 연결을 시도하다가 실패할 때 발생

//         socket.connect();//수동 재연결
//         });

//     socket.on("disconnect", (reason) => { //소켓이 연결되어 있다가 연결이 끊어질 때 발생
//         console.log(reason);
//         if (reason === "io server disconnect" || reason === "io client disconnect") {//서버나 클라이언트가 연결을 강제로 끊었을때는 자동 재연결 안해줌
//             socket.connect();//그러므로 수동 재연결
//         }
//         //그 외의 경우엔 자동 재연결 해줌
//         });

// }
// const initChat = () => {
//     socketEventHandler();
//     if (socket.connected) {

//         }

//     else {

//     }

// };

// const leaveChatRoom = () => {    //채팅 종료할때

//     if (socket.connected) {
//         socket.off('chatHistory');
//         socket.off('message');
//     }
// }

// export  {initChat,leaveChatRoom}
