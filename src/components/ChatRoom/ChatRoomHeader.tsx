
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



const ChatLoomHeader = () => {
  const navigate = useNavigate();
  const onClickBackBtn =() =>{
    navigate(-1);
  }
  return (
    <div className='relative z-10 w-full h-20 border-solid border-black border-b-2'>
      <div className='absolute top-8 left-4 hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
        <div className='absolute top-7 left-10'>상대프로필</div>
        <div className='absolute top-7 right-10'>상대닉네임</div>
    </div>
  )
}




export {ChatLoomHeader}