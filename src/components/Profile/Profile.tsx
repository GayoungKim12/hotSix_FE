import { SlSettings } from "react-icons/sl";
import GoBackButton from "../common/GoBackButton";

interface ProfileProps {
  handleShow: () => void;
}

const Profile = (props: ProfileProps) => {
  return (
    <>
      <div className="fixed top-0 flex items-center justify-between px-4 w-full h-14 bg-white shadow-md">
        <GoBackButton />
        <button className=" border-0 text-3xl focus:outline-0 hover:border-0" onClick={props.handleShow}>
          <SlSettings />
        </button>
      </div>
      <div className="flex flex-col mt-14 gap-2 pt-4 px-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border-2 rounded-full text-black"></div>
          <div className="text-lg font-semibold text-black">닉네임</div>
        </div>
        <div className="flex flex-col items-start gap-0.5 text-sm">
          <div>생일 / 성별</div>
          <div>******@****.com</div>
          <div>서울특별시 서대문구</div>
          <div>#비흡연 #반려동물</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
