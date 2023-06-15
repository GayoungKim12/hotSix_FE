
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle , AiFillCheckCircle } from "react-icons/ai";
import { useState } from "react";

interface isDeleteMode{
  isDeleteMode:boolean;
}

const ChatRoom = (props:isDeleteMode) => {
  const [isDeleteBtnPushed, setIsDeleteBtnPushed] = useState(false);
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/ChatRoom');
  };

  const handleDeleteClick = () =>{
    setIsDeleteBtnPushed(!isDeleteBtnPushed);
  }

  const onClickHandler = props.isDeleteMode ? handleDeleteClick : handleEnterClick;

  return (
    <div className='relative w-full h-36 border-solid border-black border-b-2 ' onClick={onClickHandler}>
      <div className='absolute top-12 left-7 '>사진</div>
      <div className='absolute top-8 left-20 '>닉네임</div>
      <div className='absolute top-8 right-4 '>전</div>
      <div className='absolute top-16 left-20 '>메세지내용</div>
      {props.isDeleteMode && 
      <div className='absolute top-20 right-2.5 '>
        {!isDeleteBtnPushed ? (<AiOutlineCheckCircle  className="w-6 h-6" />) : (<AiFillCheckCircle  className="w-6 h-6" />) }
      </div>}
    </div>
  );
};

export default ChatRoom;
