

import { ChatListHeader } from '../../components/Chat/ChatList/ChatListHeader'
import HeaderDeleteMode from '../../components/Chat/ChatList/HeaderDeleteMode';
import ChatList from '../../components/Chat/ChatList/ChatList'
import { useState } from "react";

export default function ChatPage() {

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const DeleteMode = () => {

    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <div className=' flex flex-col w-full h-full bg-main-100 '>
      {isDeleteMode ? (
        <>
          <HeaderDeleteMode DeleteMode={DeleteMode}/>
          <button  className='fixed z-10 w-screen bottom-0 bg-main-300' >삭제</button>
        </>
      ) : (
        <>
        <ChatListHeader DeleteMode={DeleteMode}/>
        <button  className='fixed z-10 w-screen bottom-0 bg-main-300' >원래 footer자리</button>
        </>
       
      )}
      <ChatList isDeleteMode={isDeleteMode}/>


    </div>
  )
}

