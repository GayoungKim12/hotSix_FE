import { NavigateFunction, useNavigate } from "react-router-dom";
import { createKakaoLoginToServerLoginConfig } from "../API/AxiosModule";
import { handleTokenResponse } from "./Signin";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenCategory: string;
  firstLogin:boolean;
}
const ParamCode = () => {
  const navigate: NavigateFunction = useNavigate();
  const url = new URL(window.location.href);
  console.log(url);
  console.log(url.searchParams);
  const codes = url.searchParams.get("code");
  console.log(codes);
    if (codes) {
    console.log(codes);
    const code ={
      code:codes,
    }
    createKakaoLoginToServerLoginConfig("POST",code).then((response) => {
      const accessToken = response.data["accessToken"];
      const refreshToken = response.data["refreshToken"];
      const firstLogin = response.data["firstLogin"];
      const tokenResponse: TokenResponse = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        tokenCategory: "default",
        firstLogin:firstLogin,
      };
      handleTokenResponse(tokenResponse,navigate);
    })
  .catch((error)=>{
      console.log("에러")
      console.error(error);
    });
  }

  return (
    <>
    <div></div>
    </>
  )
}

export default ParamCode
