import Profile from "../components/Profile/Profile";
import MyPostList from "../components/Profile/MyPostList";
import { useState } from "react";
import SettingButtons from "../components/Profile/SettingButtons";
import Header from "../components/Profile/Header";

const ProfilePage = () => {
  const [showSettingButtons, setShowSettingButtons] = useState(false);
  const [mypage, setMypage] = useState(false);
  return (
    <div className="pt-14 min-h-screen bg-main-100">
      <Header handleShow={() => setShowSettingButtons(false)} mypage={mypage} />
      <Profile />
      {mypage ? (
        <>
          <MyPostList />
          {showSettingButtons && <SettingButtons handleShow={() => setShowSettingButtons(false)} />}
        </>
      ) : (
        <button className="fixed bottom-0 block w-full h-12 rounded-none bg-main-400 text-white">채팅보내기</button>
      )}
    </div>
  );
};

export default ProfilePage;
