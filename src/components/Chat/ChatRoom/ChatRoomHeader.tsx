import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const ChatRoomHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [membershipId, setMembershipId] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [nickname, setNickname] = useState("null");
  const onClickBackBtn = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   console.log(location.state);
  //   const partnerInfo = location.state;
  //   setMembershipId(partnerInfo.membershipId);
  //   setImgPath(partnerInfo.imgPath);
  //   setNickname(partnerInfo.nickname);
  // });

  return (
    <div className="flex justify-between items-center h-20 border-solid border-black border-b-2">
      <div className="flex items-center p-4">
        <div className="hover:cursor-pointer" onClick={onClickBackBtn}>
          <IoArrowBackOutline></IoArrowBackOutline>
        </div>
        <img className="ml-4" src={imgPath} alt="" />
      </div>
      <div className="mr-4">{nickname}</div>
    </div>
  );
};

export { ChatRoomHeader };
