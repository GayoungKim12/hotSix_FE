
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



const ChatRoomHeader = () => {

  const navigate = useNavigate();
  const onClickBackBtn =() =>{
    navigate(-1);
  }
  
  return (
    <div className='flex justify-between items-center h-20 border-solid border-black border-b-2'>
        <div className='flex items-center p-4'>
          <div className='hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
          <h2 className="ml-4">채팅</h2>
        </div>
        <div className='mr-4'>상대닉네임</div>
    </div>
  )
}




export {ChatRoomHeader}