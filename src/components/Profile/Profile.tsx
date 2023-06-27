import { useEffect, useState } from "react";
import { JsonConfig } from "../API/AxiosModule";

interface ProfileType {
  nickname: string;
  imgPath: string;
  birth: string;
  gender: number;
  region: {
    id: number;
    sido: string;
    sigg: string;
  };
  introduction: string;
  personality: string[] | null;
}

interface PartnerType {
  membershipId: number;
  imgPath: string;
  nickname: string;
}

interface ProfileProps {
  profileId: string;
  setPartner: (value: React.SetStateAction<PartnerType>) => void;
}

const Profile = (props: ProfileProps) => {
  const { profileId, setPartner } = props;
  const accessToken = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await JsonConfig("get", `api/membership/detail/${profileId}`);
        const data = response.data;
        setProfile({
          nickname: data.nickname,
          imgPath: data.imgPath,
          birth: data.birth,
          introduction: data.introduction,
          gender: data.gender,
          region: data.region,
          personality: data.personality,
        });
        setPartner({
          membershipId: Number(profileId),
          imgPath: data.imgPath,
          nickname: data.nickname,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [profileId, accessToken, setPartner]);

  if (!profile) return <></>;

  return (
    <div className="flex flex-col gap-2 pt-4 px-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 border-2 rounded-full bg-white text-black"></div>
        <div className="text-lg font-semibold text-black">{profile.nickname}</div>
      </div>
      <div className="flex flex-col items-start gap-0.5 text-sm">
        <div>{profile.gender === 1 ? "남성" : "여성"}</div>
        <div>{profile.birth}</div>
        <div>{`${profile.region.sido} ${profile.region.sigg}`}</div>
        {profile.personality && (
          <div className="flex items-center gap-1">
            {profile.personality.map((item: string) => {
              return <div key={item}>{`#${item}`}</div>;
            })}
          </div>
        )}
        <div>{profile.introduction}</div>
      </div>
    </div>
  );
};

export default Profile;
