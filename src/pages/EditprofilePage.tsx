import { useNavigate } from "react-router-dom";
import GoBackButton from "../components/common/GoBackButton"
import { AiOutlineCheck } from "react-icons/ai";
import Region from "../components/Signup/Region";
import Personality from "../components/Signup/Personality";
import { useEffect, useRef, useState } from "react";

import jwtDecode from "jwt-decode";
import { JsonConfig, MultiConfig, } from "../components/API/AxiosModule";
import { removeAccessToken, removeRefreshToken } from "../components/API/TokenAction";
import { FaUser } from "react-icons/fa";
interface DecodedToken {
  id: string;
}
interface UserData {
  nickname: string;
  img_path?: string;
  introduction: string;
  personality: string | null;
  region: {
    id: number;
    sido: string;
    sigg: string;
  };
}
const Editprofile = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [personality, setPersonality] = useState<string[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [regionId, setRegionId] = useState<number | null>(null);
  const [introduction, setIntroduction] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState(0);
  const imgRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData |null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const defaultRegionId = userData?.region?.id || null;

  
useEffect(() => {
  if (!accessToken) return;
  const decodeToken = jwtDecode<DecodedToken>(accessToken);

  if (decodeToken.id) {
    setUserId(Number(decodeToken.id));
  }
}, [accessToken]);
const saveImgFile = () => {
  const file = imgRef.current?.files?.[0];
  setImgFile(file || null);
};

  const navigate = useNavigate();

  const handleRegionIdChange = (id: number | null) => {
    setRegionId(id);
  };
  
  const handlePersonalityChange = (option: string) => {
    if (personality.includes(option)) {
      setPersonality(personality.filter((item: string) => item !== option));
    } else {
      if (personality.length < 5) {
        setPersonality([...personality, option]);
      }
    }
  };

  const fileSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if (nickname.length < 2) {
      alert("닉네임을 2글자이상으로 해주세요 .");
      return;
    }
    
    const data ={
      nickname,
      personality:[...personality],
      regionId,
      introduction,
      imgPath:userData && userData.img_path
    }
    const formData = new FormData();  
    formData.append("form", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (imgFile) {
      formData.append('files', imgFile, imgFile.name);
    } else {
      formData.append('files', new File([], ''), 'image.jpg');
    }console.log(formData);
    MultiConfig('put',`api/membership/update/${userId}`,formData).then(()=>{alert('수정이 완료되었습니다.'); navigate('/profile')}).catch((error)=>{console.log(error)}) 
  }

  const deleteUser = ()=> {
    JsonConfig('delete',`api/membership/delete/${userId}`).then(()=>{
    removeRefreshToken;
    removeAccessToken;
    navigate('/signin');
  })}

  useEffect(() => {
    JsonConfig('get', `api/membership/detail/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (userData) {
      if (userData.personality) {
        setPersonality([...userData.personality]);
      }
      if (userData.introduction) {
        setIntroduction(userData.introduction);
      }
      if (userData.nickname) {
        setNickname(userData.nickname);
      }
    }
  }, [userData]);

  const removeImg =()=>{
    setImgFile(null)
    if (userData) {
      const updatedUserData = { ...userData,img_path:''};
      setUserData(updatedUserData);
    }
  }
  return (
    <div className="relative bg-main-100">
      <form action="" onSubmit={fileSubmit}>
      <div className="flex flex-row justify-around align-center pt-4">
        <div onClick={()=>navigate(-1)} className="">
          <GoBackButton />
        </div>
        <h2 className="text-center text-3xl">프로필 편집</h2>
        <button type="submit" onClick={()=>{fileSubmit}} className="">
            <AiOutlineCheck className="h-6 w-6"/>
        </button>
      </div>
      {imgFile?(<img className="block rounded-full mt-4 w-24 h-24 mx-auto " src={URL.createObjectURL(imgFile)} alt="" />)
      :userData && userData.img_path ? (<img className="block rounded-full mx-auto mt-4 w-24 h-24 " src={userData.img_path} alt="" />)
      :(<div className="flex items-center justify-center mx-auto mt-4 bg-main-200 rounded-full  w-24 h-24"><FaUser className="fill-main-100 w-12 h-12"/></div>)}
        <div className="flex flex-row justify-around items-center mx-auto w-9/12 mt-5 ">
          <label htmlFor="input-file" className="mt-2.5 cursor-pointer">프로필 수정</label>
          <button type="button" className="mt-2.5 cursor-pointer" onClick={removeImg}>프로필 삭제</button>
          <input className="hidden" type="file" ref={imgRef}  accept='image/jpg, image/jpeg, image/png' onChange={saveImgFile} id="input-file" />
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-nickname" className="w-9/12">닉네임</label>
          <div className="flex mt-2 ">
            <input type="text" id="input-nickname" className="w-4/5 h-10 p-2 placeholder:p-2 text-sm" value={nickname || (userData && userData.nickname) || ""} onChange={(e)=>setNickname(e.target.value)} name="nickname" placeholder="닉네임을 입력해주세요"/>
            <button className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <Region handleRegionIdChange={handleRegionIdChange} defaultRegionId={defaultRegionId}/>
        <Personality personality={personality} handlePersonalityChange={handlePersonalityChange} />
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-about">자기소개</label>
          <textarea name="inttroduction" id="input-about" value={introduction} placeholder="자신에 대해 소개해주세요" onChange={(e)=>setIntroduction(e.target.value)} className="h-40 p-4 mt-2.5"></textarea>
        </div>
        <button type="button" className="rounded-none mt-16 w-full h-12 bg-main-400 text-white" onClick={()=>{setShowModal(true)}} >회원탈퇴</button>
        {showModal && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col items-center p-4 rounded-lg bg-main-200">
                <h2 className="mt-4 text-center text-lg font-medium">회원 탈퇴를 하시겠습니까?</h2>
                <div className="">
                  <button type="button" className="px-3 py-1 my-4 mr-4 bg-main-300 text-white" onClick={deleteUser}>네</button>
                  <button type="button" className="px-3 py-1 my-4 bg-main-300 text-white" onClick={()=>{setShowModal(false)}}>아니요</button>
                </div>
              </div>
            </div>
)}
      </form>
    </div>
  )
}

export default Editprofile
