import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { partnerInfo } from "../../../pages/Chat/ChatRoomPage";

const ChatRoomHeader = ({ partnerInfomation }: { partnerInfomation: partnerInfo }) => {
  const navigate = useNavigate();
  
  const [membershipId, setMembershipId] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [nickname, setNickname] = useState("null");
  const onClickBackBtn = () => {
    navigate(-1);
  };

  useEffect(() => {
    if(partnerInfomation.nickname !== null)
    {
      setImgPath(partnerInfomation.imgPath);
      setNickname(partnerInfomation.nickname);
    }
  },[partnerInfomation]);

  return (
    <div className="flex justify-between items-center h-16 px-3 border-solid border-black border-b-2">
      <div className="flex items-center p-4">
        <div className="hover:cursor-pointer" onClick={onClickBackBtn}>
          <IoArrowBackOutline></IoArrowBackOutline>
        </div>
        <img className="ml-4 w-12 h-12 border-2 rounded-full" src={imgPath} alt="" />
      </div>
      <div className="mr-4">{nickname}</div>
    </div>
  );
};

export { ChatRoomHeader };
