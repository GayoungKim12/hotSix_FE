//토큰의 유효기간을 추출(테스트 완료)

import jwt_decode from 'jwt-decode';
import { getRefreshToken, getAccessToken } from './TokenAction';


import { setCookie } from './Cookies';


const getTokenExpiration = (tokenName:string) => {

  const token = 
  tokenName === 'refreshToken' ? getRefreshToken() :
  tokenName === 'accessToken' ? getAccessToken() :
  null;
  
  if (token) {
    try {
      const decoded = jwt_decode(token) as { exp: number } | null;
      
      if (decoded && decoded.exp) {

        const expirationTime = new Date(decoded.exp * 1000);
        console.log(`${tokenName} 만료시간:`, expirationTime);
        
        (tokenName === 'refreshToken')
        ? setCookie("refreshTokenExpire", expirationTime.toDateString(), { path: '/' }):
         (tokenName === 'accessToken')
        ? localStorage.setItem("accessTokenExpire", expirationTime.toDateString()):
         null;

        
      } else {
        console.log('잘못된 토큰.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('잘못된 토큰:', err.message);
      } else {
        console.log('알수없는 에러');
      }
    }
  } else {
    console.log(`${tokenName} 없음.`);
  }
}




export { getTokenExpiration };
