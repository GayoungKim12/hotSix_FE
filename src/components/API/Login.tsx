import { useNavigate } from "react-router-dom";

import axios from "axios";
import { setAccessToken, setRefreshToken } from "./TokenAction";
import { getTokenExpiration } from "./GetTokenExpire";

interface IDPW {
  email: string;
  password: string;
}

const Login = async (idpw: IDPW) => {

  console.log(idpw)

  try {
    
    const response = await axios.post("http://43.200.78.88:8080/login", idpw, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

      console.log("response.data:", response.data);

      const accessToken = response.data.Authorizaion;
      const refreshToken = response.data["Authorization-refresh"];

      if (accessToken && refreshToken) {
        setAccessToken(accessToken); // 로컬스토리지에 액세스토큰 저장
        setRefreshToken(refreshToken); // httponly 쿠키에 refresh 토큰 저장
        getTokenExpiration('accessToken');
        getTokenExpiration('refreshToken');
        const navigate = useNavigate();
        navigate('/');//메인페이지로 이동
      }

      

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "에러");
      } else {
        throw new Error("모르는에러?");
      }
    }
  
    
  

};

export { Login };
