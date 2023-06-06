import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [imgFile, setImgFile] = useState('https://images-ext-1.discordapp.net/external/vqAPQDC1G8skvpMUdKK-US779w_3v9yaCyXqlJ7SYLg/https/via.placeholder.com/600/92c952');
  const [year, setYear] = useState<number | 'year'>("year");
  const [month,setMonth] = useState<number | 'month'>('month')
  const [day, setDay] = useState<number | 'day'>("day");
  const [selectedDate, setSelectedDate] = useState<string>('');
  const imgRef = useRef<HTMLInputElement>(null);
  const [personality, setPersonality] = useState<any>("");
  const [gender, setGender] = useState<any>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [email , setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [sido, setSido] = useState<string>("");
  const [sigg, setSigg] = useState<string>("");
  const [regionId, setRegionId] = useState<number | null>(null);
  const mbtiOptions = [
    "ISTJ", "ISFJ", "INFJ", "INTJ",
    "ISTP", "ISFP", "INFP", "INTP",
    "ESTP", "ESFP", "ENFP", "ENTP",
    "ESTJ", "ESFJ", "ENFJ", "ENTJ",
    "야식좋아함"
  ];

  const regionOptions = [
    {
      "id": 1,
      "sido": "서울특별시",
      "sigg": "강북구"
    },
    {
      "id": 2,
      "sido": "인천광역시",
      "sigg": "도봉구"
    },
    {
      "id": 3,
      "sido": "서울특별시",
      "sigg": "노원구"
    },
    {
      "id": 4,
      "sido": "서울특별시",
      "sigg": "중랑구"
    },
    {
      "id": 5,
      "sido": "서울특별시",
      "sigg": "동대문구"
    },
    {
      "id": 6,
      "sido": "서울특별시",
      "sigg": "성북구"
    },
    {
      "id": 7,
      "sido": "서울특별시",
      "sigg": "종로구"
    },
    {
      "id": 8,
      "sido": "서울특별시",
      "sigg": "은평구"
    },
    {
      "id": 9,
      "sido": "서울특별시",
      "sigg": "서대문구"
    },
    {
      "id": 10,
      "sido": "서울특별시",
      "sigg": "마포구"
    },
    {
      "id": 11,
      "sido": "서울특별시",
      "sigg": "용산구"
    },
    {
      "id": 12,
      "sido": "서울특별시",
      "sigg": "중구"
    },
    {
      "id": 13,
      "sido": "서울특별시",
      "sigg": "성동구"
    },
    {
      "id": 14,
      "sido": "서울특별시",
      "sigg": "광진구"
    },
    {
      "id": 15,
      "sido": "서울특별시",
      "sigg": "강동구"
    },
    {
      "id": 16,
      "sido": "서울특별시",
      "sigg": "송파구"
    },
    {
      "id": 17,
      "sido": "서울특별시",
      "sigg": "강남구"
    },
    {
      "id": 18,
      "sido": "서울특별시",
      "sigg": "서초구"
    },
    {
      "id": 19,
      "sido": "서울특별시",
      "sigg": "동작구"
    },
    {
      "id": 20,
      "sido": "서울특별시",
      "sigg": "영등포구"
    },
    {
      "id": 21,
      "sido": "서울특별시",
      "sigg": "강서구"
    },
    {
      "id": 22,
      "sido": "서울특별시",
      "sigg": "양천구"
    },
    {
      "id": 23,
      "sido": "서울특별시",
      "sigg": "구로구"
    },
    {
      "id": 24,
      "sido": "서울특별시",
      "sigg": "금천구"
    },
    {
      "id": 25,
      "sido": "서울특별시",
      "sigg": "관악구"
    }
  ]

  const sidoOption = [...new Set(regionOptions.map(option => option.sido))]
  const siggOption = sido ? regionOptions.filter(option => option.sido === sido).map(option => option.sigg) : [];
  const selectedRegion =(regionOptions.find(option => option.sido === sido && option.sigg === sigg))
  if (selectedRegion && selectedRegion.id !== regionId) {
    setRegionId(selectedRegion.id);
  }
  const handleSiggChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedSigg = e.target.value;
    setSigg(selectedSigg);
    const selectedRegion = regionOptions.find(option => option.sido === sido && option.sigg === selectedSigg);
    if (selectedRegion && selectedRegion.id !== regionId) {
      setRegionId(selectedRegion.id);
    }
  }
  const handleSidoChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedSido = e.target.value;
    setSido(selectedSido);
    setSigg("");
    setRegionId(null);
  }

  const navigate = useNavigate();

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
      setSelectedDate(`${year}-${month}-${day}`);
    } else {
      setSelectedDate('');
    }
  }, [year, month, day]);

  const handlePersonalityChange  =(option: string) => {
    if (personality.includes(option)) {
      setPersonality(personality.filter((item: string) => item !== option));
    } else {
      setPersonality([...personality, option]);
    }
  };
  const handleGenderChange  =(option: string) => {
    if (gender.includes(option)) {
      setGender(gender.filter((item: string) => item !== option));
    } else {
      setGender([...gender, option]);
    }
  };
  const validatePassword = ()=> {
    return password === passwordCheck;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!validatePassword()) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자리 이상이어야 하며, 영문자와 숫자를 포함해야 합니다.");
      return;
    }

    if (!email || !password || !passwordCheck || !nickname) {
      alert("필수 입력 필드를 모두 입력해주세요.");
      return;
    }
  };

  return (
    <div className="relative bg-main-100">
      <div onClick={()=>navigate(-1)} className="absolute top-4">
        <AiOutlineArrowLeft className=" w-9 h-7"/>
      </div>
      <h2 className="pt-4 text-center text-3xl">회원가입</h2>
      <form action="" onSubmit={handleSubmit} method="post">
        <div className="flex flex-col items-center mt-5 ">
          <img className="block rounded-full w-24 h-24 " src={imgFile} alt="" />
          <label htmlFor="input-file" className="mt-2.5">프로필 사진 추가</label>
          <input className="hidden" type="file" ref={imgRef} onChange={saveImgFile} id="input-file" />
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-email" className="w-9/12 after:content-['*'] after:text-red-500">이메일</label>
          <div className="flex w-9/12">
            <input type="email" id="input-email" className="w-4/5 h-10" value={email} onChange={(e)=>setEmail(e.target.value)} name="email"/>
            <button className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-password" className="w-9/12 after:content-['*'] after:text-red-500" >비밀번호</label>
          <input type="password" id="input-password" className="w-9/12 h-10" value={password} onChange={(e)=>setPassword(e.target.value)} name="password"/>
          <span className="text-red-500 text-sm w-9/12">영문자, 숫자 8자 이상</span>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-passwordcheck" className="w-9/12 after:content-['*'] after:text-red-500" >비밀번호확인</label>
          <input type="password" id="input-passwordcheck" className="w-9/12 h-10" value={passwordCheck} onChange={(e)=>setPasswordCheck(e.target.value)}/>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-nickname" className="w-9/12 after:content-['*'] after:text-red-500">닉네임</label>
          <div className="flex w-9/12">
            <input type="text" id="input-nickname" className="w-4/5 h-10" value={nickname} onChange={(e)=>setNickname(e.target.value)} name="nickname"/>
            <button className="rounded-none bg-main-400 w-1/5 h-10 text-white"><AiOutlineCheck className='mx-auto my-0'/></button>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-birth" className="w-9/12 after:content-['*'] after:text-red-500" >생년월일</label>
          <div className="flex justify-between w-9/12">
            <select id="input-birth" onChange={(e) => setYear(e.target.value as number | 'year')} className="w-1/4 text-sm">
              <option disabled value={year}>출생연도</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select onChange={(e) => setMonth(e.target.value as number | 'month')} className="w-1/4 text-sm">
              <option disabled value={month}>출생월</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select onChange={(e) => setDay(e.target.value as number | 'day')} className="w-1/4 text-sm">
              <option disabled value={day}>출생월</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input type="text" name="birth" className="hidden" defaultValue={selectedDate}/>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-region" className="w-9/12">원하는지역</label>
          <div className="flex justify-between w-9/12">
            <select onChange={handleSidoChange} className="w-5/12 text-sm">
              <option disabled>시도</option>
              {sidoOption.map((option)=>(
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select onChange={handleSiggChange} className="w-5/12 text-sm">
              <option disabled>시군구</option>
              {siggOption.map((option)=>(
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <input type="text" name="regionId" className="hidden" defaultValue={regionId !==null ? String(regionId) : ''}/>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-tendency" className="w-9/12">성향</label>
          <div className="flex flex-wrap justify-between w-9/12 mt-2.5">
            {mbtiOptions.map((option) => (
              <div key={option} className="mt-1 border">
                <input type="checkbox" id={`input-personality-${option}`} name="personality"  value={option}  onChange={() => handlePersonalityChange(option)} className="sr-only"/>
                <label htmlFor={`input-personality-${option}`} className={`block h-full px-1 ${personality.includes(option) ? 'bg-main-400 text-white' : 'bg-white'} text-sm`}>#{option}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-gender" className="w-9/12">성별</label>
          <div className="flex w-9/12 mt-2.5 ">
            <div className="mt-1 mr-4 border">
              <input type="checkbox" id="input-gender-man" name="gender" value='1' onChange={()=> handleGenderChange('man')}  className="sr-only"/>
              <label htmlFor="input-gender-man" className={`block h-full px-1 ${gender.includes('man') ? 'bg-main-400 text-white' : 'bg-white'}`}>남성</label>
            </div>
            <div className="mt-1 border">
              <input type="checkbox" id="input-gender-woman" name="gender" value='2' onChange={()=>handleGenderChange('woman')}  className="sr-only"/>
              <label htmlFor="input-gender-woman" className={`block h-full px-1 ${gender.includes('woman') ? 'bg-main-400 text-white' : 'bg-white'}`}>여성</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 items-center">
          <label htmlFor="input-about" className="w-9/12">자기소개</label>
          <textarea name="inttroduction" id="input-about" value={introduction} placeholder="자신에 대해 소개해주세요" onChange={(e)=>setIntroduction(e.target.value)} className="w-9/12 h-40 p-4 mt-2.5"></textarea>
        </div>
        <button type="submit" className="rounded-none mt-16 w-full h-12 bg-main-400 text-white">가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;