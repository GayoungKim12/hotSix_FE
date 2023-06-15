

const ChatInput = () => {


  return (

    <div className=" bottom-0 w-full h-12 chat-input-container ">
      <div className="flex h-full items-center justify-between ">
        <label className="z-10 rounded-l-2xl h-12 w-8 bg-white ">
          <input type="file" accept="image/*" className='hidden ' />
          <span className='relative top-3 left-1'>img</span>
        </label>
        <input className="flex-grow h-12 px-4 " placeholder="채팅을 입력" />
        <button className="rounded-r-2xl h-12 w-10 bg-white  border-black border-l-2  ">확인</button>
      </div>
    </div>

  )
}



export default ChatInput