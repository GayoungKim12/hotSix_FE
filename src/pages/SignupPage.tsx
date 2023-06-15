import { useEffect, useRef, useState } from "react";
import {  AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import Region from "../components/Signup/Region";
import Personality from "../components/Signup/Personality";
import GoBackButton from "../components/common/GoBackButton";
import axios from "axios";

const SignUp = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [year, setYear] = useState<number | 'year'>("year");
  const [month,setMonth] = useState<number | 'month'>('month')
  const [day, setDay] = useState<number | 'day'>("day");
  const [birthday, setBirthday] = useState<string>('');
  const imgRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState<number>();
  const [introduction, setIntroduction] = useState<string>("");
  const [email , setEmail] = useState<string>("")
  const [emailCheck , setEmailCheck] = useState<string>('')
  const [password , setPassword] = useState<string>("")
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [personalities, setPersonality] = useState<string[]>([]);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [verify, setVerify] = useState<string>('true');
  console.log(birthday)

  const handleRegionIdChange = (id: number | null) => {
    setRegionId(id);
  };

  const handlePersonalityChange = (option: string) => {
    if (personalities.includes(option)) {
      setPersonality(personalities.filter((item: string) => item !== option));
    } else {
      if (personalities.length < 5) {
        setPersonality([...personalities, option]);
      }
    }
  };
  const navigate = useNavigate();

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    setImgFile(file || null);
  };
  
  
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 1970; i <= currentYear; i++) {
    years.push(i);
  }

  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = [];
  if (year !== "year" && month !== "month") {
    const numDays = daysInMonth(year, month);
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }
  }

  useEffect(() => {
    if (year !== 'year' && month !== 'month' && day !== 'day') {
      setBirthday(`${year}-${month}-${day}`);
    } else {
      setBirthday('');
    }
  }, [year, month, day]);


  const handleGenderChange  =(option: string) => {
    if (option === "남성") {
      setGender(1);
    } else if (option === "여성") {
      setGender(0);
    }
  };
  
  const validatePassword = ()=> {
    return password === passwordCheck;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자리 이상이어야 하며, 영문자와 숫자를 포함해야 합니다.");
      return;
    }
  
    if (!validatePassword()) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (personalities.length === 0) {
      alert("성향을 1개 이상 골라주세요.");
      return;
    }
  
    if (regionId === null) {
      alert("지역을 선택해주세요.");
      return;
    }
  
    if (!birthday) {
      alert("생년월일을 선택해주세요.");
      return;
    }
  
    if (!introduction) {
      alert("자기소개를 입력해주세요.");
      return;
    }
    try {
      const data ={
        email,
        password,
        nickname,
        birthday,
        gender,
        personalities,
        regionId,
        introduction,
        verify
      }
      const formData = new FormData();
      formData.append("form", new Blob([JSON.stringify(data)], { type: "application/json" }));
      if (imgFile) {
        formData.append('files', imgFile, imgFile.name);
      } else {
        formData.append('files', new File([], ''), 'image.jpg');
      }console.log(formData);
      await axios.post('http://43.200.78.88:8080/signup', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('데이터 및 이미지 전송 성공');
    } catch (error) {
      console.error('전송 실패', error);
    }
  };
  
  const emailSubmit = async () => {
    try {
      const requestData = {
        email: email,
      };
      await axios.post(
        'http://43.200.78.88:8080/email/auth',requestData,{
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('이메일 전송 성공');
    } catch (error) {
      console.error('이메일 전송 실패', error);
    }
  };
  return (
    <div className="relative bg-main-100">
      <div onClick={()=>navigate(-1)} className="absolute top-4 left-4">
        <GoBackButton />
      </div>
      <h2 className="pt-4 text-center text-3xl">회원가입</h2>
      <form action="http://43.200.78.88:8080/signup" onSubmit={handleSubmit} method="post">
        <div className="flex flex-col items-center mx-auto w-9/12 mt-5 ">
          {imgFile?(<img className="block rounded-full w-24 h-24 " src={URL.createObjectURL(imgFile)} alt="" />):(<div className="flex items-center justify-center bg-main-200 rounded-full w-24 h-24">
            프로필
          </div>)}
          <label htmlFor="input-file" className="mt-2.5">프로필 사진 추가</label>
          <input className="hidden" type="file" ref={imgRef}  accept='image/jpg, image/jpeg, image/png' onChange={saveImgFile} id="input-file" />
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-email" className="w-9/12 after:content-['*'] after:text-red-500">이메일</label>
          <div className="flex mt-2 ">
            <input type="email" id="input-email" className="w-4/5 h-10 placeholder:p-2 text-sm" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="이메일을 입력해주세요"/>
            <button type="button" className="rounded-none bg-main-400 w-1/5 h-10 text-white" onClick={emailSubmit} ><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-emailCheck" className="w-9/12 after:content-['*'] after:text-red-500">이메일 인증</label>
          <div className="flex mt-2 ">
            <input type="number" id="input-emailCheck" className="w-4/5 h-10 placeholder:p-2 text-sm" value={emailCheck} onChange={(e)=>setEmailCheck(e.target.value)} name="emailCheck" placeholder="인증번호를 입력해주세요"/>
            <button type="button" className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-password" className="w-9/12 after:content-['*'] after:text-red-500" >비밀번호</label>
          <input type="password" id="input-password" className="mt-2 h-10 placeholder:p-2 text-sm" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="비밀번호를 입력해주세요"/>
          <span className="text-red-500 text-sm w-9/12">영문자, 숫자 8자 이상</span>
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-passwordcheck" className="w-9/12 after:content-['*'] after:text-red-500" >비밀번호확인</label>
          <input type="password" id="input-passwordCheck" className="mt-2 h-10 placeholder:p-2 text-sm" value={passwordCheck} onChange={(e)=>setPasswordCheck(e.target.value)} placeholder="비밀번호를 다시 한 번 입력해주세요"/>
          {!validatePassword() ?(
            <span className="text-red-500 text-sm w-9/12">비밀번호가 일치하지않습니다.</span>
          ):(
            <span className="text-green-500 text-sm w-9/12">비밀번호가 일치합니다</span>
          )}
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-nickname" className="w-9/12 after:content-['*'] after:text-red-500">닉네임</label>
          <div className="flex mt-2 ">
            <input type="text" id="input-nickname" className="w-4/5 h-10 placeholder:p-2 text-sm" value={nickname} onChange={(e)=>setNickname(e.target.value)} name="nickname" placeholder="닉네임을 입력해주세요"/>
            <button className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-birth" className="w-9/12 after:content-['*'] after:text-red-500" >생년월일</label>
          <div className="flex justify-between mt-2">
            <select value={year}  id="input-birth" onChange={(e) => setYear(e.target.value as number | 'year')} className="py-1 w-1/4 text-sm">
              <option disabled  value={'year'}>출생연도</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select value={month} onChange={(e) => setMonth(e.target.value as number | 'month')} className="w-1/4 text-sm">
              <option disabled  value={'month'}>출생월</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select value={day} onChange={(e) => setDay(e.target.value as number | 'day')} className="w-1/4 text-sm">
              <option disabled  value={'day'}>출생월</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input type="text" name="birth" className="hidden" defaultValue={birthday}/>
          </div>
        </div>
        <Region handleRegionIdChange={handleRegionIdChange}/>
        <Personality personality={personalities} handlePersonalityChange={handlePersonalityChange} />
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-gender" className="w-9/12">성별</label>
          <div className="flex w-9/12 mt-2.5 " id="input-gender">
            <div className="mt-1 mr-4 border">
              <input type="checkbox" id="input-gender-man" name="gender" value='1' onChange={()=> handleGenderChange('남성')} checked={gender === 1}  className="sr-only"/>
              <label htmlFor="input-gender-man" className={`block h-full px-1 ${gender ===1 ? 'bg-main-400 text-white' : 'bg-white'}`}>남성</label>
            </div>
            <div className="mt-1 border">
              <input type="checkbox" id="input-gender-woman" name="gender" value='2' onChange={()=>handleGenderChange('여성')} checked={gender === 0} className="sr-only"/>
              <label htmlFor="input-gender-woman" className={`block h-full px-1 ${gender === 0 ? 'bg-main-400 text-white' : 'bg-white'}`}>여성</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 mx-auto w-9/12">
          <label htmlFor="input-about">자기소개</label>
          <textarea name="inttroduction" id="input-about" value={introduction} placeholder="자신에 대해 소개해주세요" onChange={(e)=>setIntroduction(e.target.value)} className="h-40 p-4 mt-2.5"></textarea>
        </div>
        <button type="submit" className="rounded-none mt-16 w-full h-12 bg-main-400 text-white" >가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;