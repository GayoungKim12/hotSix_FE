
import {ChatRoomHeader} from '../../components/Chat/ChatRoom/ChatRoomHeader';
import ChatInput from '../../components/Chat/ChatRoom/ChatInput';
import { ChatRoomBody } from '../../components/Chat/ChatRoom/ChatRoomBody';
function ChatLoomPage() {
  return (
    <div className='absolute flex flex-col w-full  h-screen bg-main-100'>
        <ChatRoomHeader/>
        <ChatRoomBody/>
        <ChatInput/>
    </div>
  )
}

export default ChatLoomPage