import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { JsonConfig } from "../API/AxiosModule";
import axios from "axios";

interface LikeButtonProps {
  postId: number;
  like: boolean;
  setLike: (like: boolean) => void;
  likes?: number;
  setLikes?: (likes: number) => void;
}

interface DecodedToken {
  id: string;
}

const LikeButton = (props: LikeButtonProps) => {
  const URL = "http://43.200.78.88:8080";
  const accessToken = localStorage.getItem("accessToken");
  const [userId, setUserId] = useState<number | null>(null);

  const { postId, like, setLike, likes, setLikes } = props;

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  // 좋아요 버튼 기능
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    (async () => {
      try {
        if (like) {
          if (setLikes && typeof likes === "number") {
            setLikes(likes - 1);
          }
          await axios({
            method: "delete",
            url: `${URL}/api/likes/${postId}/${userId}`,
            headers: {
              Authorization: `${accessToken}`,
            },
          });
          /* await JsonConfig("delete", `${URL}/api/likes/${postId}/${userId}`); */
        } else {
          if (setLikes && typeof likes === "number") {
            setLikes(likes + 1);
          }
          await axios({
            method: "post",
            url: `${URL}/api/likes/${postId}/${userId}`,
            headers: {
              Authorization: `${accessToken}`,
            },
          });
          /* await JsonConfig("post", `${URL}/api/likes/${postId}/${userId}`); */
        }
        setLike(!like);
      } catch (err) {
        console.error(err);
      }
    })();
  };
  return (
    <button className="text-2xl border-0 focus:outline-0 hover:border-0" onClick={handleLike}>
      {like ? <AiFillHeart className="text-red-400" /> : <AiOutlineHeart className="text-main-400" />}
    </button>
  );
};

export default LikeButton;
