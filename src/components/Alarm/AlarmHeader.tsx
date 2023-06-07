import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";

interface DeleteMode{
    DeleteMode: () => void;
  }
  

const AlarmHeader = (props:DeleteMode) => {
    
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
            <div className='absolute top-3 left-10'>알림</div>
            <BsFillTrash3Fill className='absolute top-3 right-4 ' onClick={onClickTrashBtn}></BsFillTrash3Fill>
           
        </div>
    )
}

export default AlarmHeader