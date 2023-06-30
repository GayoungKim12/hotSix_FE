// const ChatInput = () => {

//   const sock = new SockJS("http://localhost:8080/{백에서 설정한 end point}")
//   sock.onopen = function() {
//       console.log('open');
//       sock.send('test');
//   };

// const [socket] = useAtom(socketAtom);

// const newChatRef = useRef<HTMLInputElement>(null);
// const userId = getUserId();

// const [arrivalChat, setArrivalChat] = useState<Message[] | null>(null); // 도착한 메세지 저장
// const { getChats, updateChats } = ChatUtil();

// useEffect(() => {//맨처음 렌더링됐을때
//   console.log(getUserId());
//   console.log("채팅방입장")
//   initChat();//eventhandler 등록

//   socket.emit('loadChatHistory'); //예전에 상대방과 채팅했던 기록 요청

//   socket.on('chatHistory', (chatHistory) => {//예전에 채팅했던 기록 보내줌
//     console.log(chatHistory);
//     if(chatHistory)//만약 채팅기록있으면
//     {
//       updateChats(chatHistory);//업데이트
//     }

//   });

//   return () => {
//     console.log("채팅방나감");
//     leaveChatRoom();//채팅방 unmount될때 socket연결끊기
//   };
// }, []);

// useEffect(() => { //상대방 클라이언트에서 메시지 보내면 자동으로 수신
//       socket.on('message', (chatObj) => { // 메세지 수신
//           console.log(chatObj);
//           const { result, errmsg } = chatObj;
//           if (!errmsg) {
//             setArrivalChat(result);//자동으로 밑에 채팅 리스트 업데이트 코드 실행
//           } else {
//             console.error(errmsg);
//           }
//       });
//   }, [socket]);

// useEffect(() => {//상대한테 채팅오면 기존 채팅 리스트에 새 메시지추가

//   arrivalChat && updateChats(arrivalChat);

// }, [arrivalChat]);

// useEffect(() => {
//   console.log(getChats());
// }, [getChats()]);

// const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) =>{
//   if (e.key === 'Enter') {// Enter쳤으면 메시지보내기
//     e.preventDefault();
//     sendMessage();
//   }

// }

// const sendMessage = () => {//내가 메세지 보내기
//   console.log("^^^")
//   console.log(userId)
//   if (newChatRef.current !== null && userId) {//텍스트가 첨부됐으면
//     const inputValue = newChatRef.current.value;
//     console.log(inputValue);

//     const messageData:Message = {
//       text: inputValue,
//       timestamp: new Date().toISOString(),
//       userId: userId
//     };
//     console.log(messageData)

//     socket.emit('message', messageData);

//     updateChats([messageData]);

//     newChatRef.current.value = ''; // 입력 필드 초기화
//   }

//   }

// const sendPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {

//   if(e.target.files && userId)
//   {
//     const img = e.target.files[0];
//     console.log(img)

//     const formData = new FormData();
//     if (img) {
//       formData.append('files', img, img.name);
//     } else {
//       formData.append('files', new File([], ''), 'image.jpg');
//     }
//     const messageData:Message = {
//       formData: formData,
//       timestamp: new Date().toISOString(),
//       userId: userId
//     };
//     console.log(messageData);
//     socket.emit('image', formData);
//     updateChats([messageData]);

//   }

// };

//   return (

//     <div className=" bottom-0 w-full h-12 chat-input-container ">
//       <div className="flex h-full items-center justify-between ">
//         <label className="z-10 rounded-l-2xl h-12 w-8 bg-white ">
//           <input onChange={sendPhoto} type="file" accept="image/*" className='hidden ' />
//           <span className='relative top-3 left-1'>img</span>
//         </label>
//         <input ref={newChatRef} onKeyDown={pressEnter}  className="flex-grow h-12 px-4 " placeholder="채팅을 입력" />
//         <button onClick={sendMessage} className="rounded-r-2xl h-12 w-10 bg-white  border-black border-l-2  ">확인</button>
//       </div>
//     </div>

//   )
// }

// export default ChatInput
