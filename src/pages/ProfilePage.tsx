import Profile from "../components/Profile/Profile";
import MyPostList from "../components/Profile/MyPostList";
import { useEffect, useState } from "react";
import SettingButtons from "../components/Profile/SettingButtons";
import Header from "../components/Profile/Header";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  id: string;
}

const ProfilePage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);

  const [showSettingButtons, setShowSettingButtons] = useState(false);
  const [mypage, setMypage] = useState(true);
  const [notMyProfile, setNotMyProfile] = useState(false);
  const { profileId } = useParams();

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  useEffect(() => {
    if (Number(profileId) === userId) {
      setMypage(true);
      setNotMyProfile(false);
    } else {
      setMypage(false);
      setNotMyProfile(true);
    }
  }, [userId, profileId]);

  if (!profileId) return <></>;

  return (
    <div className="pt-14 min-h-screen bg-main-100">
      <Header handleShow={() => setShowSettingButtons(true)} mypage={mypage} />
      <Profile profileId={profileId} />
      {mypage && userId && (
        <>
          <MyPostList />
          {showSettingButtons && <SettingButtons handleShow={() => setShowSettingButtons(false)} />}
        </>
      )}
      {notMyProfile && (
        <button className="fixed bottom-0 block w-full h-12 rounded-none bg-main-400 text-white">채팅보내기</button>
      )}
    </div>
  );
};

export default ProfilePage;
