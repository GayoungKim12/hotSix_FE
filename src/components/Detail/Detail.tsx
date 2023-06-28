import { BiComment } from "react-icons/bi";
import { GoKebabHorizontal } from "react-icons/go";
import BreadCrump from "./BreadCrump";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { JsonConfig } from "../API/AxiosModule";
import LikeButton from "../common/LikeButton";
import { useNavigate } from "react-router-dom";

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
  imgPath: string[];
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
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const [details, setDetails] = useState<DetailType | null>(null);
  const { postId, handleShow } = props;
  const [myPost, setMyPost] = useState(false);
  const [likes, setLikes] = useState(0);
  const [like, setLike] = useState(false);

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
        const response = await JsonConfig("get", `api/post/${postId}/${userId}`);
        const data = response.data;
        console.log(data);
        setDetails({
          boardId: data.boardId,
          gender: data.gender,
          address: data.address,
          content: data.content,
          createdAt: data.createdAt,
          imgPath: data.imgPath,
          membership: data.membership,
        });
        setLikes(data.likes);
        setLike(data.like);
        setMyPost(data.membership.membershipId === userId);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [postId, setDetails, accessToken, userId]);

  const goProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!details) return null;
    navigate(`/profile/${details.membership.membershipId}`);
  };

  if (!details) return <></>;

  return (
    <section className="flex flex-col items-start w-full bg-white rounded-b-xl shadow-md text-base">
      <div className="flex flex-col gap-4 items-start p-4 w-full">
        <BreadCrump category={details.boardId} />
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div
              className="relative flex justify-center items-center w-12 h-12 border-2 rounded-full bg-white text-black overflow-hidden"
              onClick={goProfile}
            >
              {details.membership.imgPath.length ? (
                <img
                  className="w-full h-full object-cover"
                  src={details.membership.imgPath}
                  alt={`${details.membership.nickname}의 프로필 이미지`}
                />
              ) : (
                <div
                  className={
                    "absolute top-3 flex justify-center items-center text-4xl text-main-200"
                  }
                >
                  <FaUser />
                </div>
              )}
            </div>
            <div>
              <div className="text-base font-semibold text-black" onClick={goProfile}>
                {details.membership.nickname}
              </div>
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
            <span>{details.address}</span>/
            <span>{details.gender === 1 ? "남자" : "여자"}</span>
          </div>
          <p>{details.content}</p>
        </div>
      </div>
      <div className="flex justify-center align-items w-full bg-gray-200">
        <Carousel items={details.imgPath} />
      </div>
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center justify-between px-2 w-full">
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              <BiComment />
            </div>
            <span className="text-base leading-4">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <LikeButton postId={Number(postId)} like={like} setLike={setLike} likes={likes} setLikes={setLikes} />
            <span className="text-base leading-4">{likes}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
