import { IoArrowBackOutline } from "react-icons/io5";


interface DeleteMode{
    DeleteMode: () => void;
  }



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

export default HeaderDeleteMode;