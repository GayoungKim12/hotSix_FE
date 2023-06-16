import { useEffect, useState } from "react"
import { Link  } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { createKakaoLoginConfig, createLoginConfig } from "../API/AxiosModule";
import {  getTokenExpiration, isTokenValid, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from "../API/TokenAction";


// interface TokenResponse1 {
//     "Authorization":string,
//     "Authorization-refresh":string
// }

// interface TokenResponse2 {
//   "access_token":string
//   "expires_in":number
//   "id_token":string
//   "refresh_token":string
//   "refresh_token_expires_in":number
//   "scope":string
//   "token_type":string

// }

// type TokenResponse = TokenResponse1 | TokenResponse2;

const Signin = () => {
  const [email , setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const navigate = useNavigate();
  const redirect_uri = 'http://localhost:5173/signin';

  useEffect(() => {
    handleAuthorizationCode();
  }, []);

  const handleAuthorizationCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const Rest_api_key =localStorage.getItem("Rest_api_key")

    if (code && Rest_api_key) {
      createKakaoLoginConfig("POST","authorization_code",Rest_api_key,redirect_uri,code).then((response)=>{
        console.log(typeof(response));

        handleTokenResponse(response.data,"access_token","refresh_token",
        'kakao',"expires_in","refresh_token_expires_in");
        }).catch((error)=>{
          console.log("에러")
          console.error(error);
        });
    }
  };



  const defaultSignin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const IDPW = {
      email: email,
      password: password,
    };
    createLoginConfig("POST", "login",IDPW)
    .then((response) => {
      handleTokenResponse(response.data,"Authorization","Authorization-refresh",
      'default');
    }) .catch((error) => {
      console.log("에러")
      console.error(error);
    });
  };

const kakaotalkSignIn =() =>{
    removeAccessToken();
    removeRefreshToken();
    localStorage.setItem("Rest_api_key",'ba688a75557d3918702599015fe8d999');
    const Rest_api_key =localStorage.getItem("Rest_api_key")
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    window.location.href = kakaoURL;
}

const handleTokenResponse = (response:any,access:string,refresh:string,category:string,accessExpire:string="",refreshExpire:string="") =>{
  console.log(response);

  const accessToken = response[access];
  const refreshToken = response[refresh];
  if (accessToken && refreshToken) {
    setAccessToken(accessToken); // 로컬스토리지에 액세스토큰 저장
    setRefreshToken(refreshToken); // httponly 쿠키에 refresh 토큰 저장
    localStorage.setItem('tokenCategory',category);
    getTokenExpiration('accessToken',response[accessExpire]);
    getTokenExpiration('refreshToken',response[refreshExpire]);
    isTokenValid();
    navigate('/');//메인페이지로 이동
  }
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
          <button onClick={defaultSignin} type="submit" className=" flex items-center justify-center mx-auto rounded-none mt-4 w-9/12 h-12 bg-main-400 text-white">로그인</button>
          <div className="flex justify-end">
            <Link to={'/Signup'}>회원가입</Link>
          </div>
          <img src="../../public/kakao_login_large_wide.png" className=" w-full" onClick={kakaotalkSignIn} />
        </form>
    </div>
  )
}

export default Signin
