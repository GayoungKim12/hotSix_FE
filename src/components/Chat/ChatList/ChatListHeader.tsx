import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";

interface DeleteMode{
  DeleteMode: () => void;
}


const ChatListHeader = (props:DeleteMode) => {
  
  const navigate = useNavigate();
  const onClickBackBtn =() =>{
    navigate(-1);
  }

  const onClickTrashBtn = () => {
      props.DeleteMode();
  };

  return (
    <div className='relative w-full h-24 border-solid border-black border-b-2'>
        <div className='absolute top-4 left-4 hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
        <div className='absolute top-3 left-10'>채팅</div>
        <BsFillTrash3Fill className='absolute top-3 right-4 ' onClick={onClickTrashBtn}></BsFillTrash3Fill>
        <input className='absolute top-12 left-4 shadow-sm' placeholder='닉네임을 입력하세요'></input>
    </div>
  )
};



const HeaderDeleteMode = (props:DeleteMode) => {


  const onClickBackBtn =() =>{
    props.DeleteMode();
  }
  return (
    <div className='relative w-full h-24 border-solid border-black border-b-2'>
        <div className='absolute top-4 left-4 hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
        <div className='absolute top-3 left-10'>삭제</div>
        <button className='absolute top-3 right-4 bg-main-300'>전체삭제</button>
    </div>
  )
};


export {ChatListHeader,HeaderDeleteMode}