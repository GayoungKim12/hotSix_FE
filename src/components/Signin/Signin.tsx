import { useState } from "react"
import { Link } from "react-router-dom"

const Signin = () => {
  const [email , setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")

  return (
    <div>
        <h1><a href="/"><img src="../../../public/logo.png" alt="" /></a></h1>
        <form action="">
          <div className="flex flex-col mt-5 items-center">
            <label htmlFor="input-email" className="w-9/12">이메일</label>
            <div className="flex w-9/12">
              <input type="email" id="input-email" className="w-4/5 h-10" value={email} onChange={(e)=>setEmail(e.target.value)} name="email"/>
            </div>
          </div>
          <div className="flex flex-col mt-5 items-center">
            <label htmlFor="input-password" className="w-9/12" >비밀번호</label>
            <input type="password" id="input-password" className="w-9/12 h-10" value={password} onChange={(e)=>setPassword(e.target.value)} name="password"/>
          </div>
          <button type="submit" className=" flex items-center justify-center mx-auto rounded-none mt-4 w-9/12 h-12 bg-main-400 text-white">로그인</button>
          <div className="flex justify-end">
            <Link to={'/Signup'}>회원가입</Link>
          </div>
          <button type="button" className=" flex items-center justify-center mx-auto rounded-none mt-4 w-9/12 h-12 bg-yellow-300">카카오로 로그인</button>
        </form>
    </div>
  )
}

export default Signin
