
import ChatRoom from './ChatRoom'

interface isDeleteMode{
  isDeleteMode:boolean;

}
const ChatList = (props:isDeleteMode) => {
  return (
    <div className='flex flex-col '>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    <ChatRoom isDeleteMode={props.isDeleteMode}/>
    {/* //받아와서 map으로 chatloom으로 렌더링 */}
    </div>
  )
};


export default ChatList;