
import {ChatLoomHeader} from '../../components/Chat/ChatLoom/ChatLoomHeader';
import ChatInput from '../../components/Chat/ChatLoom/ChatInput';
import { ChatLoomBody } from '../../components/Chat/ChatLoom/ChatLoomBody';
function ChatLoomPage() {
  return (
    <div className='absolute flex flex-col w-full  h-full bg-main-100'>
        <ChatLoomHeader/>
        <ChatLoomBody/>
        <ChatInput/>
    </div>
  )
}

export default ChatLoomPage