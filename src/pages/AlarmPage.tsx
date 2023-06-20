import { useState } from "react";
import HeaderDeleteMode from "../components/Chat/ChatList/HeaderDeleteMode";
import AlarmContainer from "../components/Alarm/AlarmContainer";
import AlarmHeader from "../components/Alarm/AlarmHeader";

const AlarmPage = () =>{

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const DeleteMode = () => {

        setIsDeleteMode(!isDeleteMode);
    };
    return (
        <div className='flex flex-col  w-full  h-full  bg-main-100 '>

            {isDeleteMode ? (
                <>
                <HeaderDeleteMode DeleteMode={DeleteMode}/>
                <button  className='fixed z-10 w-full bottom-0 bg-main-300' >삭제</button>
                </>
            ) : (
                <>
                <AlarmHeader DeleteMode={DeleteMode}/>
                <button  className='fixed z-10 w-full bottom-0 bg-main-300' >원래 footer자리</button>
                </>
        
            )}

            <AlarmContainer isDeleteMode={isDeleteMode}/>
        </div>
    )
}

export default AlarmPage