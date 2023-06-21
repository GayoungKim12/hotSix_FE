import axios from "axios";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useRef, useState } from "react";

interface DecodedToken {
  id: string;
}

interface PostType {
  postId: string;
  boardId: number;
  membership: {
    membershipId: number;
    imgPath: string;
    nickname: string;
  };
  regionId: number;
  address: string;
  content: string;
  likes: number;
  gender: number;
  imgPath: string[];
}

const MyPostList = () => {
  const URL = "http://43.200.78.88:8080";

  const accessToken = localStorage.getItem("accessToken");

  const [userId, setUserId] = useState(0);
  const [postList, setPostList] = useState<PostType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastPostId, setLastPostId] = useState(0);

  const limit = 5;
  const target = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  const getFirstPage = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${URL}/post/basic/${userId}`,
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const datas = response.data;
      if (datas.length !== limit) {
        setMore(false);
      }
      setLastPostId(datas[datas.length - 1].id);
      setPostList([...datas]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [accessToken, userId]);

  const loadMore = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${URL}/post/${userId}`,
        headers: {
          Authorization: `${accessToken}`,
        },
        params: {
          lastPostId,
          size: limit,
        },
      });
      const datas = response.data;
      console.log(datas);
      if (datas.length !== limit) {
        setMore(false);
      }
      setLastPostId(datas[datas.length - 1].id);
      setPostList((prev) => {
        if (prev === null) return null;
        return [...prev, ...datas];
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [lastPostId, accessToken, userId]);

  const onIntersect = useCallback(
    async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await loadMore();
      }
    },
    [loadMore]
  );

  useEffect(() => {
    if (!userId) return;
    setMore(true);
    setPostList(null);
    (async () => {
      await getFirstPage();
      window.scrollTo({ top: 0, behavior: "auto" });
    })();
  }, [getFirstPage, setPostList, userId]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      if (isLoading) {
        observer.unobserve(target.current);
      } else {
        observer.observe(target.current);
      }
    }

    return () => {
      setIsLoading(false);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onIntersect, isLoading]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h3 className="flex items-center justify-center w-full h-12 border-b-2 border-main-400 text-main-400 text-md">
        게시물
      </h3>
      <div className="flex flex-col items-center gap-2">
        {postList !== null && postList.length
          ? postList.map((post, idx) => {
              return (
                <div className="p-8 bg-white" key={idx}>
                  {post.content}
                </div>
              );
            })
          : "작성한 게시물이 없습니다."}
      </div>
      {more && <div ref={target}>Loading...</div>}
    </div>
  );
};

export default MyPostList;
