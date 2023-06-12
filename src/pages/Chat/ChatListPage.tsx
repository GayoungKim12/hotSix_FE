

import { ChatListHeader } from '../../components/ChatList/ChatListHeader'
import HeaderDeleteMode from '../../components/ChatList/HeaderDeleteMode';
import ChatList from '../../components/ChatList/ChatList'
import { useState } from "react";

export default function ChatPage() {

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const DeleteMode = () => {

    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <div className=' flex flex-col w-full h-screen bg-main-100 '>
      {isDeleteMode ? (
        <>
          <HeaderDeleteMode DeleteMode={DeleteMode}/>
          <button  className='fixed  w-screen bottom-0 bg-main-300' >삭제</button>
        </>
      ) : (
        <>
        <ChatListHeader DeleteMode={DeleteMode}/>
        <button  className='fixed w-screen bottom-0 bg-main-300' >원래 footer자리</button>
        </>
       
      )}
      <ChatList isDeleteMode={isDeleteMode}/>


    </div>
  )
}

