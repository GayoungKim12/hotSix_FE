

import {isTokenValid, setAccessToken, setRefreshToken } from "./TokenAction.tsx";
import { getTokenExpiration } from "./TokenAction.tsx";
import { createLoginConfig } from "./AxiosModule.ts";
interface IDPW {
  email: string;
  password: string;
}

const Login = async (idpw: IDPW,navigate:(link: string) => void) => {

  console.log(idpw)

    
    createLoginConfig("POST", "login",idpw)
      .then((response) => {
        console.log("response.data:", response.data);
        const accessToken = response.data["Authorization"];
        const refreshToken = response.data["Authorization-refresh"];
  
        if (accessToken && refreshToken) {
          setAccessToken(accessToken); // 로컬스토리지에 액세스토큰 저장
          setRefreshToken(refreshToken); // httponly 쿠키에 refresh 토큰 저장
          getTokenExpiration('accessToken');
          getTokenExpiration('refreshToken');
          isTokenValid();
          navigate('/');//메인페이지로 이동
        }
  
        
  
        return response.data;
      }) .catch((error) => {
        console.log("에러")
        console.error(error);
      });
     

    
  
  
  

};

export { Login };
