import { useEffect, useState } from "react";
import { BiComment } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";
import PostToolButtons from "../common/PostToolButtons";
import { useNavigate } from "react-router-dom";
import LikeButton from "../common/LikeButton";

interface PostType {
  nickname: string;
  imgPath: string;
  gender: number;
  region: string;
  createdAt: string;
  content: string;
  commentCount: number;
  postId: number;
  postImgPath: string;
  like: boolean;
}

interface CardProps {
  post: PostType;
}

const Card = (props: CardProps) => {
  const { post } = props;
  const navigate = useNavigate();
  const [showPostButtons, setShowPostButtons] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(post.like);
  }, [post.like]);

  return (
    <>
      <section
        className="flex flex-col gap-3 bg-white rounded-lg p-4 w-full drop-shadow-xl cursor-pointer"
        onClick={() => navigate(`/detail/${post.postId}`)}
      >
        <article className="flex items-start justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="relative flex justify-center items-center w-12 h-12 border-2 rounded-full bg-white text-black overflow-hidden">
              {post.imgPath.length ? (
                <img
                  className="w-full h-full object-cover"
                  src={post.imgPath}
                  alt={`${post.imgPath}의 프로필 이미지`}
                />
              ) : (
                <div className={"absolute top-3 flex justify-center items-center text-4xl text-main-200"}>
                  <FaUser />
                </div>
              )}
            </div>
            <div>
              <div className="text-base font-semibold text-black">{post.nickname}</div>
              <div className="text-xs text-gray-400">{post.createdAt.split("T")[0]}</div>
            </div>
          </div>
          <button
            className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowPostButtons(true);
            }}
          >
            <GoKebabHorizontal />
          </button>
        </article>
        <article className="flex flex-col gap-1.5 text-sm">
          <div>
            <div>성별 : {post.gender === 1 ? "남성" : "여성"}</div>
            <div>지역 : {post.region}</div>
            <div>내용 : {post.content.length > 5 ? `${post.content.substr(0, 5) + "..."}` : post.content}</div>
          </div>
          {post.postImgPath.length !== 0 && (
            <div className="inline-flex flex-col items-center justfiy-center">
              <img src={post.postImgPath} className="w-full rounded-lg bg-black" draggable="false" />
            </div>
          )}
        </article>
        <article className="flex justify-between items-center px-1">
          <div className="flex items-center">
            <div className="text-indigo-300">
              <BiComment className="text-2xl" />
            </div>
            <div className="ml-1">{post.commentCount}</div>
          </div>
          <LikeButton postId={post.postId} like={like} setLike={setLike} />
        </article>
      </section>
      {showPostButtons && <PostToolButtons handleShow={() => setShowPostButtons(false)} postId={post.postId} />}
    </>
  );
};

export default Card;
