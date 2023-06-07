
import ChatLoom from './ChatLoom'

interface isDeleteMode{
  isDeleteMode:boolean;

}
const ChatList = (props:isDeleteMode) => {
  return (
    <div className='flex flex-col '>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    <ChatLoom isDeleteMode={props.isDeleteMode}/>
    {/* //받아와서 map으로 chatloom으로 렌더링 */}
    </div>
  )
};


export default ChatList;