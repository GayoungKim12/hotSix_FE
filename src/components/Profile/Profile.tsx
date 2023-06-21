import axios from "axios";
import { useEffect, useState } from "react";

interface ProfileProps {
  profileId: string;
}

interface ProfileType {
  nickname: string;
  birth: string;
  introduction: string;
  gender: number;
  region: {
    id: number;
    sido: string;
    sigg: string;
  };
  personality: string[];
}

const Profile = (props: ProfileProps) => {
  const URL = "http://43.200.78.88:8080";

  const { profileId } = props;
  const accessToken = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${URL}/memberships/detail/${profileId}`,
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        const data = response.data;
        setProfile({
          nickname: data.nickname,
          birth: data.birth,
          introduction: data.introduction,
          gender: data.gender,
          region: data.region,
          personality: data.personality,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [profileId, accessToken]);

  if (!profile) return <></>;

  return (
    <>
      <div className="flex flex-col gap-2 pt-4 px-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border-2 rounded-full bg-white text-black"></div>
          <div className="text-lg font-semibold text-black">{profile.nickname}</div>
        </div>
        <div className="flex flex-col items-start gap-0.5 text-sm">
          <div>{profile.gender === 1 ? "남성" : "여성"}</div>
          <div>{profile.birth}</div>
          <div>{`${profile.region.sido} ${profile.region.sigg}`}</div>
          <div className="flex items-center gap-1">
            {profile.personality.map((item: string) => {
              return <div key={item}>{`#${item}`}</div>;
            })}
          </div>
          <div>{profile.introduction}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
