import Profile from "../components/Profile/Profile";
import MyPostList from "../components/Profile/MyPostList";
import { useEffect, useState } from "react";
import SettingButtons from "../components/Profile/SettingButtons";
import Header from "../components/Profile/Header";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Footer from "../components/common/Footer";
import axios from "axios";

interface DecodedToken {
  id: string;
}

interface PartnerType {
  membershipId: number;
  imgPath: string;
  nickname: string;
}

const ProfilePage = () => {
  const URL = "http://43.200.78.88:8080";
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const [showSettingButtons, setShowSettingButtons] = useState(false);
  const [mypage, setMypage] = useState(false);
  const [notMyProfile, setNotMyProfile] = useState(false);
  const { profileId } = useParams();
  const [partner, setPartner] = useState<PartnerType>({
    membershipId: 0,
    imgPath: "",
    nickname: "",
  });

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

  const sendChat = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${URL}/api/chat/room`,
        headers: {
          Authorization: `Bearer ${accessToken}`, //액세스토큰을 넣고
        },
        data: {
          senderId: userId,
          receiverId: Number(profileId),
        },
      });
      navigate(`/chat/${response.data}`, { state: partner });
    } catch (err) {
      console.log(err);
    }
  };

  if (!profileId || !userId) return <></>;

  return (
    <div className="pt-14 min-h-screen bg-main-100">
      <Header handleShow={() => setShowSettingButtons(true)} mypage={mypage} />
      <Profile profileId={profileId} setPartner={setPartner} />
      {mypage && userId && (
        <>
          <MyPostList />
          {showSettingButtons && <SettingButtons userId={userId} handleShow={() => setShowSettingButtons(false)} />}
        </>
      )}
      {notMyProfile && (
        <button
          className="fixed bottom-16 left-1/2 -translate-x-2/4 block w-11/12 h-12 rounded-md bg-main-400 text-white focus:outline-none"
          onClick={sendChat}
        >
          채팅 보내기
        </button>
      )}
      <Footer userId={userId} selected={false} />
    </div>
  );
};

export default ProfilePage;
