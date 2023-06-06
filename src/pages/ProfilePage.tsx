import Profile from "../components/Profile/Profile";
import MyPostList from "../components/Profile/MyPostList";
import { useState } from "react";
import SettingButtons from "../components/Profile/SettingButtons";
import Introduction from "../components/Profile/Introduction";

const ProfilePage = () => {
  const [showSettingButtons, setShowSettingButtons] = useState(false);
  return (
    <div>
      <Profile handleShow={() => setShowSettingButtons(true)} />
      {/* <MyPostList /> */}
      <Introduction />
      <button className="fixed bottom-0 block w-full h-12 rounded-none bg-main-400 text-white">채팅보내기</button>
      {showSettingButtons && <SettingButtons handleShow={() => setShowSettingButtons(false)} />}
    </div>
  );
};

export default ProfilePage;
