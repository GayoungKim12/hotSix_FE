//토큰이 만료되기 30분전인지 확인 (테스트 완료)

import {getCookie } from './Cookies';
const checkTokenExpiration = (tokenName:string) => {



    const expirationTime = 
    tokenName === 'refreshToken' ? localStorage.getItem("accessTokenExpire") :
    tokenName === 'accessToken' ?  getCookie('refreshTokenExpire') :
    null;

   
    

   if ( expirationTime) {

    const currentTime = new Date();

    const timeDiffMinutes = Math.round((new Date(expirationTime).getTime() - currentTime.getTime()) / (1000 * 60));

    if (timeDiffMinutes <= 30) {
      console.log('토큰이 만료되기 30분전입니다. 갱신합니다');
      return false;
 
    } else {
      console.log('토큰이 유효합니다.');
      return true;
    }
  } else {
    console.log('유효하지 않은 토큰.');
  }
}


export { checkTokenExpiration };
