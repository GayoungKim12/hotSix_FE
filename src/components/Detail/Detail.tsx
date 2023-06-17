import { BiComment } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { GoKebabHorizontal } from "react-icons/go";
import BreadCrump from "./BreadCrump";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FaUser } from "react-icons/fa";

interface DetailProps {
  postId: string;
  handleShow: () => void;
}

interface DetailType {
  boardId: number;
  gender: number;
  address: string | null;
  content: string;
  createdAt: string;
  likes: number;
  files: string[];
  like: boolean;
  membership: {
    membershipId: number;
    imgPath: string;
    nickname: string;
  };
}

interface DecodedToken {
  id: string;
}

const Detail = (props: DetailProps) => {
  const URL = "http://43.200.78.88:8080";
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);

  const [details, setDetails] = useState<DetailType | null>(null);
  const { postId, handleShow } = props;
  const [myPost, setMyPost] = useState(false);

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const response = await axios({
          method: "get",
          url: `http://43.200.78.88:8080/post/${postId}`,
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        const data = response.data;
        console.log(data);
        setDetails({
          boardId: data.boardId,
          gender: data.gender,
          address: data.address,
          content: data.content,
          createdAt: data.createdAt,
          likes: data.likes,
          files: data.imgPath,
          like: data.like,
          membership: data.membership,
        });
        setMyPost(data.membership.membershipId === userId);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, setDetails, accessToken, userId]);

  const handleLike = () => {
    if (!details) return null;

    (async () => {
      try {
        let data: { like: boolean; likes: number };
        if (details.like) {
          data = { like: !details.like, likes: details.likes - 1 };
        } else {
          data = { like: !details.like, likes: details.likes + 1 };
        }

        // responsse: 성공인지 아닌지만 체크
        const response = await axios({
          method: "patch",
          url: `${URL}/post/${postId}`,
          headers: {
            Authorization: `${accessToken}`,
          },
          data,
        });

        if (response) {
          setDetails((prev: DetailType | null) => {
            if (!prev) return null;
            return { ...prev, ...data };
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  if (!details) return <></>;

  return (
    <section className="flex flex-col items-start w-full bg-white rounded-b-xl shadow-md text-base">
      <div className="flex flex-col gap-4 items-start p-4 w-full">
        <BreadCrump category={details.boardId} />
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="relative flex justify-center items-center w-12 h-12 border-2 rounded-full bg-white text-black overflow-hidden">
              {details.membership.imgPath.length ? (
                <img
                  className="w-full h-full object-cover"
                  src={details.membership.imgPath}
                  alt={`${details.membership.nickname}의 프로필 이미지`}
                />
              ) : (
                <div className={"absolute top-3 flex justify-center items-center text-4xl text-main-200"}>
                  <FaUser />
                </div>
              )}
            </div>
            <div>
              <div className="text-base font-semibold text-black">{details.membership.nickname}</div>
              <div className="text-xs text-gray-400">{details.createdAt}</div>
            </div>
          </div>
          {myPost && (
            <button
              className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-100"
              onClick={handleShow}
            >
              <GoKebabHorizontal />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 font-semibold">
            <span>{details.address}</span>/<span>{details.gender === 1 ? "남자" : "여자"}</span>
          </div>
          <p>{details.content}</p>
        </div>
      </div>
      <div className="flex justify-center align-items w-full">
        <Carousel items={details.files} />
      </div>
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              <BiComment />
            </div>
            <span className="text-base leading-4">{details.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-2xl border-0 focus:outline-0 hover:border-0" onClick={handleLike}>
              {details.like ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <span className="text-base leading-4">{details.likes}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
