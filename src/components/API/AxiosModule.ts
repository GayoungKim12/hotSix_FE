import axios from 'axios';
import { getAccessToken, isTokenValid } from './TokenAction.tsx';


const axiosInstance = axios.create();

//요청 전 액션
axiosInstance.interceptors.request.use(
  (config) => {
    isTokenValid();

    console.log("1")
    return config;
  },
  (error) => {
    // 요청에 오류가 있으면
    console.log("2")
    return Promise.reject(error);
  }
);

//응답 후 액션
axiosInstance.interceptors.response.use(
  (response) => {
    //응답 성공적이면
    console.log("3")
    return response;
  },
  (error) => {
    //응답이 error로 왔으면
    console.log("4")
    return Promise.reject(error);
  }
);

//로그인할때만 필요
const createLoginConfig = (met:string, url:string,requestBody:unknown) => {
  const config = {
    baseURL: `http://43.200.78.88:8080/${url}`,
    method: met,
    headers: {
      'Content-Type': 'application/json',
    },
    data:requestBody,
  };
  console.log(config.data)
  return axiosInstance(config);
};

//로그인할때만 필요
const createKakaoLoginConfig = (met:string,grant_type:string,client_id:string,redirect_uri:string,code:string) => {
  const config = {
    baseURL: 'https://kauth.kakao.com/oauth/token',
    method: met,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data:{grant_type,client_id,redirect_uri,code},
  };
  console.log(config.data)
  return axiosInstance(config);
};


//requestBody 모듈화: unknwon으로 하던가 인터페이스 전부 적어놓고 if else같은걸로 그때그때 맞추던가 해야함
//그외의 요청?
const accessToken = getAccessToken();

const createConfig = (method:string, url:string,requestBody:unknown) => {
  const config = {
    baseURL: `http://43.200.78.88:8080/${url}`,
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data:requestBody,
  };

  return axiosInstance(config);
};

// createLoginConfig(원하는method,엔드포인트,요청본문에 들어갈거).then((response)=>{
// }).catch((error)=>{
//   console.log("에러")
//   console.error(error);
// });




export{createLoginConfig ,createConfig ,createKakaoLoginConfig}
