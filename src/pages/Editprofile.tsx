import { useNavigate } from "react-router-dom";
import GoBackButton from "../components/common/GoBackButton"
import { AiOutlineCheck } from "react-icons/ai";
import Region from "../components/Signup/Region";
import Personality from "../components/Signup/Personality";
import { useRef, useState } from "react";
import axios from "axios";

const Editprofile = () => {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef<HTMLInputElement>(null);
  const [personality, setPersonality] = useState<string[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [regionId, setRegionId] = useState<number | null>(null);
  const [introduction, setIntroduction] = useState<string>("");

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
      };
    }
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const fileSubmit = ()=>{
    const formData = new FormData();
    formData.append("profile", imgFile);
    axios({
      headers: {
			"Content-Type": "multipart/form-data",
		},
      url:'',
      method:'post',
      data:formData,
    })
    .then((res) => setImgFile(res.data))
		.catch((err) => console.log(err));
  }
  return (
    <div className="relative bg-main-100">
      <div onClick={()=>navigate(-1)} className="absolute top-4 left-4">
        <GoBackButton />
      </div>
      <h2 className="pt-4 text-center text-3xl">프로필 편집</h2>
      <div className="flex flex-col items-center mx-auto w-9/12 mt-5 ">
          {imgFile?(<img className="block rounded-full w-24 h-24 " src={imgFile} alt="" />):(<div className="flex items-center justify-center bg-main-200 rounded-full w-24 h-24">
            프로필
          </div>)}
          <label htmlFor="input-file" className="mt-2.5">프로필 사진 변경</label>
          <input className="hidden" type="file" ref={imgRef} onChange={saveImgFile} id="input-file" />
        </div>
      <form action="" onSubmit={handleSubmit} method="post">
        <button type="submit" onClick={()=>{fileSubmit}} className="absolute top-4 right-4">
          <AiOutlineCheck className="h-6 w-6"/>
        </button>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-nickname" className="w-9/12 after:content-['*'] after:text-red-500">닉네임</label>
          <div className="flex mt-2 ">
            <input type="text" id="input-nickname" className="w-4/5 h-10 placeholder:p-2 text-sm" value={nickname} onChange={(e)=>setNickname(e.target.value)} name="nickname" placeholder="닉네임을 입력해주세요"/>
            <button className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <Region handleRegionIdChange={handleRegionIdChange}/>
        <Personality personality={personality} handlePersonalityChange={handlePersonalityChange} />
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-about">자기소개</label>
          <textarea name="inttroduction" id="input-about" value={introduction} placeholder="자신에 대해 소개해주세요" onChange={(e)=>setIntroduction(e.target.value)} className="h-40 p-4 mt-2.5"></textarea>
        </div>
        <button type="submit" className="rounded-none mt-16 w-full h-12 bg-main-400 text-white" >회원탈퇴</button>
      </form>
    </div>
  )
}

export default Editprofile
