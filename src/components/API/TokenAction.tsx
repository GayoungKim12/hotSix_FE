//토큰값 반환(isTokenValid 빼고테스트 완료)

import axios from 'axios';
import {setCookie,getCookie,removeCookie} from './Cookies';
import jwt_decode from 'jwt-decode';



//-------------------------------------------------------------------------토큰 저장,삭제,가져오기 액션
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

//-------------------------------------------------------------------------토큰 유효성 검사 액션
// case 1) access 토큰은 만료, refresh 토큰 유효 ⇒ refresh 토큰을 검증하여 access 토큰 발급
// case 2) : access 토큰은 유효, refresh 토큰은 만료된 경우 ⇒ 일단 진행시키고 access 토큰도 만료되면 로그아웃
// case 3): 두개의 토큰 모두 만료 ⇒ 로그아웃

//토큰이 유효한지 검사(테스트 완료)
const isTokenValid = async () => {
  let isAccessTokenValid = checkTokenExpiration('accessToken');
  const isRefreshTokenValid = checkTokenExpiration('refreshToken');
  
  while (!isAccessTokenValid) {
    if (!isAccessTokenValid && isRefreshTokenValid) {
      await refreshAccessToken();
      isAccessTokenValid = checkTokenExpiration('accessToken');
      return;
    } else if (!isAccessTokenValid && !isRefreshTokenValid) {
      removeAccessToken();
      removeRefreshToken();
      console.log("둘다 만료")
      // 로그아웃

    }
  }
};




//토큰의 유효기간을 추출(테스트 완료)
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
        ? setCookie("refreshTokenExpire", expirationTime.toISOString(), { path: '/' }):
         (tokenName === 'accessToken')
        ? localStorage.setItem("accessTokenExpire", expirationTime.toISOString()):
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


//토큰이 만료되기 30분전인지 확인 (테스트 완료)
let a =1;

const checkTokenExpiration = (tokenName:string) => {

  const expirationTime = 
  tokenName === 'refreshToken' ?  getCookie('refreshTokenExpire')  :
  tokenName === 'accessToken' ?  localStorage.getItem("accessTokenExpire") :
  null;

 
 if ( expirationTime) {

    const currentTime = new Date();

    let timeDiffMinutes = Math.round((new Date(expirationTime).getTime() - currentTime.getTime()) / (1000 * 60));
    
    if(a<=2)
    {
      console.log("시간조작")
      timeDiffMinutes=timeDiffMinutes-1000000000000000;
      a++;
    }
     
    console.log(`${tokenName}이 만료되기까지`+timeDiffMinutes+`분 남았습니다`);
    if (timeDiffMinutes <= 5) {
      console.log('토큰이 만료되기 5분전입니다. 갱신합니다');
      return false;

    } else {
      console.log('토큰이 유효합니다.');
      return true;
    }
  } else {
    console.log('유효하지 않은 토큰.');
    }
}




//토큰 재발급
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();

    const headers = {
      'Authorization': accessToken,
      'Authorization-refresh': refreshToken
    };

    const response = await axios.post("http://43.200.78.88:8080/refresh",null, {
        headers:headers
    });
    console.log(response.data);

    const newAceessToken = response.data.Authorizaion;

    removeAccessToken();
    setAccessToken(newAceessToken);

    getTokenExpiration("accessToken");
    console.log('Access token 갱신.');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "에러");
    } else {
      throw new Error("모르는에러?");
    }
  }
};


// const refreshRefreshToken = async () => {
//   try {
//     const refreshToken = getRefreshToken();
//     const accessToken = getAccessToken();

//     const headers = {
//       'Authorization': accessToken,
//       'Authorization-refresh': refreshToken
//     };

//     const response = await axios.post("api엔드포인트",null, {
//         headers:headers
//     });

//     const newRefreshToken = response.data["Authorization-refresh"];
//     removeRefreshToken();
//     setRefreshToken(newRefreshToken);
    
//     console.log('Access token 갱신.');
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.message || "에러");
//     } else {
//       throw new Error("모르는에러?");
//     }
//   }
// };



export{isTokenValid,setAccessToken,setRefreshToken,getRefreshToken,getAccessToken,removeAccessToken,removeRefreshToken,checkTokenExpiration,getTokenExpiration,refreshAccessToken};