//토큰 재발급

import axios from 'axios';
import { removeRefreshToken,getRefreshToken, getAccessToken ,removeAccessToken,setAccessToken,setRefreshToken} from './TokenAction';



const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();

    const headers = {
      'Authorization': accessToken,
      'Authorization-refresh': refreshToken
    };

    const response = await axios.post("api엔드포인트",null, {
        headers:headers
    });

    const newAceessToken = response.data.Authorizaion;

    removeAccessToken();
    setAccessToken(newAceessToken);

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



export { refreshAccessToken };
