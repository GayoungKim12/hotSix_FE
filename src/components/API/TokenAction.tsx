//토큰값 반환(isTokenValid 빼고테스트 완료)

import {setCookie,getCookie,removeCookie} from './Cookies';
import { checkTokenExpiration } from "./CheckTokenExpriation";
import { refreshAccessToken } from "./RenewToken";

const setAccessToken = (token:string) => {
  localStorage.setItem("accessToken", token); 
};

const setRefreshToken  = (token:string) => {
  setCookie('refreshToken', token, { path: '/' });
};


const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};

const getRefreshToken = () => {
  const refreshToken = getCookie('refreshToken');
  return refreshToken;
};


const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const removeRefreshToken = () => {
  removeCookie('refreshToken');
};

// case 1) access 토큰은 만료, refresh 토큰 유효 ⇒ refresh 토큰을 검증하여 access 토큰 발급
// case 2) : access 토큰은 유효, refresh 토큰은 만료된 경우 ⇒ 일단 진행시키고 access 토큰도 만료되면 로그아웃
// case 3): 두개의 토큰 모두 만료 ⇒ 로그아웃
//토큰이 유효한지 검사
const isTokenValid = async () => {
  let isAccessTokenValid = checkTokenExpiration('accessToken');
  const isRefreshTokenValid = checkTokenExpiration('refreshToken');
  
  while (!isAccessTokenValid) {
    if (!isAccessTokenValid && isRefreshTokenValid) {
      await refreshAccessToken();
      isAccessTokenValid = checkTokenExpiration('accessToken');
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      removeAccessToken();
      removeRefreshToken();
      // 로그아웃
      break;
    }
  }
  
  return;
};

//async로 해도 될까?
// const isTokenValid = () =>{
//   const isAccessTokenValid = checkTokenExpiration('accessToken');
//   const isRefreshTokenValid = checkTokenExpiration('refreshToken');
  
//   while(isAccessTokenValid)
//   {
//     if(isAccessTokenValid){
//       break;
//     }
//     else if(!isAccessTokenValid && isRefreshTokenValid){
//         refreshAccessToken();
//     }
//     else if(!isAccessTokenValid && !isRefreshTokenValid){
//         removeAccessToken();
//         removeRefreshToken();
//         //logout
//     }
//   }

//   return;
// }

export{isTokenValid,setAccessToken,setRefreshToken,getRefreshToken,getAccessToken,removeAccessToken,removeRefreshToken};