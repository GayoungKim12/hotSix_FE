import { createKakaoLoginToServerLoginConfig } from "../API/AxiosModule";

const ParamCode = () => {
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
      console.log(response);
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
