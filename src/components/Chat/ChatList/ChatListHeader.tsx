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
    <header className='flex flex-col justify-between  h-24 border-solid border-black border-b-2'>
        <div className='flex justify-between p-4' >
          <div className='flex'>
            <div className='flex justify-center items-center hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
            <h2 className="ml-4">채팅</h2>
          </div>
          <BsFillTrash3Fill  onClick={onClickTrashBtn}></BsFillTrash3Fill>
        </div>
        <input className='shadow-sm' placeholder='닉네임을 입력하세요'></input>
    </header>
  )
};




export {ChatListHeader}