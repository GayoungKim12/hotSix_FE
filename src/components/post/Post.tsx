import { HiOutlinePlus } from "react-icons/hi";

const Post = () => {
  /* const [selected, setSelected] = useState({
    category: "",
    gender: "",
    address: "",
    context: "",
    images: [],
  }); */

  return (
    <form className="mb-12 min-w-0 h-screen overflow-auto">
      <article className="p-4">
        <div className="mb-2 text-base">카테고리</div>
        <div className="flex gap-2">
          <button className="px-4 py-0.5 border-2 border-inherit rounded-xl bg-white text-sm">방 구해요</button>
          <button className="px-4 py-0.5 rounded-xl bg-main-400 text-sm text-white">방 있어요</button>
        </div>
        <div className="mt-4 mb-2 text-base">성별</div>
        <div className="flex gap-2">
          <button className="px-4 py-0.5 border-2 border-inherit rounded-xl bg-white text-sm">남자</button>
          <button className="px-4 py-0.5 border-2 border-inherit rounded-xl bg-white text-sm">여자</button>
        </div>
        <div className="mt-4 mb-2 text-base">지역</div>
        <div className="flex gap-4">
          <select className="px-0.5 py-0.5 border-2 border-inherit rounded-xl text-sm">
            <option className="px-0.5 py-0.5 text-sm">선택</option>
            <option className="px-0.5 py-0.5 text-sm">서울특별시</option>
          </select>
          <select className="px-0.5 py-0.5 border-2 border-inherit rounded-xl text-sm">
            <option className="px-0.5 py-0.5 text-sm">선택</option>
            <option className="px-0.5 py-0.5 text-sm">서울특별시</option>
          </select>
        </div>
        <div className="mt-4 mb-2 text-base">내용</div>
        <textarea
          className="block w-full h-60 px-4 py-4 rounded-xl border-2 border-inherit text-sm resize-none"
          placeholder="내용을 입력해주세요."
        ></textarea>
        <div className="mt-4 mb-2 text-base">사진첨부</div>
        <div>
          <button className="px-5 py-5 rounded-xl border-gray-300 border-2 border-inherit bg-gray-300 text-2xl text-white">
            <HiOutlinePlus />
          </button>
        </div>
      </article>
      <button className="fixed bottom-0 block w-full h-12 rounded-none bg-main-400 text-white">등록하기</button>
    </form>
  );
};

export default Post;
