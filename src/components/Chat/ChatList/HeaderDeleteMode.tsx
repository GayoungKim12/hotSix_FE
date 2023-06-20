import { IoArrowBackOutline } from "react-icons/io5";


interface DeleteMode{
    DeleteMode: () => void;
  }



const HeaderDeleteMode = (props:DeleteMode) => {


    const onClickBackBtn =() =>{
      props.DeleteMode();
    }
    return (
      <div className='flex justify-between items-center h-24 border-solid border-black border-b-2'>
        <div className='flex justify-between p-4' >
          <div className='flex items-center'>
          <div className='flex justify-center hover:cursor-pointer' onClick={onClickBackBtn}><IoArrowBackOutline></IoArrowBackOutline></div>
          <h2 className="ml-4">채팅</h2>
          </div>
        </div>
        <button className='items-center h-1/2 mr-4 bg-main-300'>전체삭제</button>
      </div>
    )
  };

export default HeaderDeleteMode;