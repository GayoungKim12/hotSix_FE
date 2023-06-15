import { useEffect, useState } from "react"
import { Link  } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Login } from "../API/Login";
import { createKakaoLoginConfig } from "../API/AxiosModule";



const Signin = () => {
  const [email , setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const navigate = useNavigate();
  const Rest_api_key='ba688a75557d3918702599015fe8d999';
  const redirect_uri = 'http://localhost:5173/signin';

  useEffect(() => {
    handleAuthorizationCode();
  }, []);

  const handleAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log('Authorization code:', code);
      createKakaoLoginConfig("POST","authorization_code",Rest_api_key,redirect_uri,code);
    }
  };

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const IDPW = {
      email: email,
      password: password,
    };
    Login(IDPW,navigate);
  };

const kakaotalkSignIn =() =>{
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    window.location.href = kakaoURL;
}




  return (
    <div>
        <h1><a href="/"><img src="../../../public/logo.png" alt="" /></a></h1>
        <form action="">
          <div className="flex flex-col mt-5 items-center">
            <label htmlFor="input-email" className="w-9/12">이메일</label>
            <div className="flex w-9/12">
              <input type="email" id="input-email" className="w-4/5 h-10" value={email} onChange={(e)=>setEmail(e.target.value)} name="email"/>
            </div>
          </div>
          <div className="flex flex-col mt-5 items-center">
            <label htmlFor="input-password" className="w-9/12" >비밀번호</label>
            <input type="password" id="input-password" className="w-9/12 h-10" value={password} onChange={(e)=>setPassword(e.target.value)} name="password"/>
          </div>
          <button onClick={handleSubmit} type="submit" className=" flex items-center justify-center mx-auto rounded-none mt-4 w-9/12 h-12 bg-main-400 text-white">로그인</button>
          <div className="flex justify-end">
            <Link to={'/Signup'}>회원가입</Link>
          </div>
          <img src="../../public/kakao_login_large_wide.png" className=" w-full" onClick={kakaotalkSignIn} />
        </form>
    </div>
  )
}

export default Signin
