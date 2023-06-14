//api호출할때 access토큰 제출하는 로직 

import { isTokenValid } from "./TokenAction";



//1)가장먼저 access,refresh토큰의 만료시간 체크

//2)토큰 관련 액션 끝나면 헤더에 액세스토큰 담아서 요청


const SubmitAccessToken = () => {
    isTokenValid();

}



export default SubmitAccessToken