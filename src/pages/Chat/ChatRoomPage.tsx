
import {ChatLoomHeader} from '../../components/ChatRoom/ChatRoomHeader';
import ChatInput from '../../components/ChatRoom/ChatInput';
import { ChatLoomBody } from '../../components/ChatRoom/ChatRoomBody';
function ChatLoomPage() {
  return (
    <div className='absolute flex flex-col w-full  h-screen bg-main-100'>
        <ChatLoomHeader/>
        <ChatLoomBody/>
        <ChatInput/>
    </div>
  )
}

export default ChatLoomPage