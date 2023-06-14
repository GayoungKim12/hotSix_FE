import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";

interface EditPostProps {
  postId: string;
}

interface PostEditType {
  board_id: number;
  address_id: number;
  address: string;
  content: string;
  img_path: string[];
}

interface RegionType {
  id: number;
  sido: string;
  sigg: string;
}

const EditPost = (props: EditPostProps) => {
  const URL = "http://localhost:3001";
  const [postForm, setPostForm] = useState<PostEditType>({
    board_id: 0,
    address_id: 0,
    address: "",
    content: "",
    img_path: [],
  });
  const [regions, setResions] = useState<RegionType[] | null>(null);
  const [sidos, setSidos] = useState<string[]>([]);
  const [siggs, setSiggs] = useState<RegionType[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${URL}/regions`);
      const data = response.data;
      setResions(data);
    })();
  }, []);

  useEffect(() => {
    if (!regions) return;

    const allSidos: string[] = [];
    regions.forEach((region) => {
      if (!allSidos.includes(region.sido)) {
        allSidos.push(region.sido);
      }
    });

    setSidos(allSidos);
  }, [regions]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${URL}/posts/${props.postId}`);
        const data = response.data;
        console.log(data);
        setPostForm({
          board_id: data.board_id,
          address_id: data.address_id,
          address: data.address,
          content: data.content,
          img_path: data.img_path,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.postId]);

  useEffect(() => {
    if (!regions || !postForm) return;

    const siggsBySido = regions.filter((region) => region.sido === postForm.address.split(" ")[0]);
    setSiggs(siggsBySido);
  }, [postForm, regions]);

  const changePostForm = (type: "board_id" | "content", value: number | string) => {
    setPostForm((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postForm.board_id) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!postForm.address_id) {
      alert("지역을 선택해주세요.");
      return;
    }

    if (!postForm.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log(postForm);

    (async () => {
      try {
        await axios({
          method: "patch",
          url: `${URL}/posts/${props.postId}`,
          data: postForm,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const changeSido = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!regions) return;

    const siggsBySido = regions.filter((region) => region.sido === e.target.value);
    setSiggs(siggsBySido);
    setPostForm((prev) => {
      return {
        ...prev,
        ["address_id"]: 0,
        ["address"]: e.target.value,
      };
    });
  };

  const changeSigg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split(" ");

    setPostForm((prev) => {
      return {
        ...prev,
        ["address_id"]: Number(value[0]),
        ["address"]: `${prev.address?.split(" ")[0]} ${value[1]}`,
      };
    });
  };

  return (
    <form className="pt-14 pb-12 min-w-0 min-h-screen overflow-auto" onSubmit={handleSubmit}>
      <article className="p-4">
        <div className="mb-2 text-base">카테고리</div>
        <div className="flex gap-2">
          <button
            className={
              postForm.board_id === 1
                ? "px-4 py-0.5 rounded-xl border-2 border-main-400 bg-main-400 text-sm text-white hover:border-main-400 focus:outline-none"
                : "px-4 py-0.5 rounded-xl border-2 border-inherit bg-white text-sm text-black hover:border-inherit focus:outline-none"
            }
            onClick={(e) => {
              e.preventDefault();
              changePostForm("board_id", 1);
            }}
          >
            방 구해요
          </button>
          <button
            className={
              postForm.board_id === 2
                ? "px-4 py-0.5 rounded-xl border-2 border-main-400 bg-main-400 text-sm text-white hover:border-main-400 focus:outline-none"
                : "px-4 py-0.5 border-2 border-inherit rounded-xl bg-white text-sm hover:border-inherit focus:outline-none"
            }
            onClick={(e) => {
              e.preventDefault();
              changePostForm("board_id", 2);
            }}
          >
            방 있어요
          </button>
        </div>
        <div className="mt-4 mb-2 text-base">지역</div>
        <div className="flex gap-2">
          <select
            onChange={changeSido}
            value={postForm.address.split(" ")[0]}
            className="px-0.5 py-0.5 border-2 border-inherit rounded-xl text-sm focus:outline-main-400"
          >
            <option className="px-0.5 py-0.5 text-sm">선택</option>
            {sidos.map((sido) => {
              return (
                <option className="px-0.5 py-0.5 text-sm" key={sido}>
                  {sido}
                </option>
              );
            })}
          </select>
          <select
            onChange={changeSigg}
            value={`${postForm.address_id} ${postForm.address.split(" ")[1]}`}
            className="px-0.5 py-0.5 border-2 border-inherit rounded-xl text-sm focus:outline-main-400"
          >
            <option className="px-0.5 py-0.5 text-sm" value={"0 선택"}>
              선택
            </option>
            {siggs &&
              siggs.map((sigg) => {
                return (
                  <option className="px-0.5 py-0.5 text-sm" key={sigg.id} value={`${sigg.id} ${sigg.sigg}`}>
                    {sigg.sigg}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mt-4 mb-2 text-base">{`내용`}</div>
        <textarea
          className="block w-full h-60 px-4 py-4 rounded-xl border-2 border-inherit text-sm resize-none focus:outline-main-400"
          placeholder="내용을 입력해주세요."
          value={postForm.content}
          onChange={(e) => changePostForm("content", e.target.value)}
        ></textarea>
        <div className="mt-4 mb-2 text-base">사진첨부</div>
        <div>
          <button className="px-5 py-5 rounded-xl border-gray-300 border-2 border-inherit bg-gray-300 text-2xl text-white">
            <HiOutlinePlus />
          </button>
        </div>
      </article>
      <button className="fixed bottom-0 block w-full h-12 rounded-none bg-main-400 text-white focus:outline-none">
        등록하기
      </button>
    </form>
  );
};

export default EditPost;
