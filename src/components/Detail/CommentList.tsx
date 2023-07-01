import { useState, useEffect, useRef, useCallback } from "react";
import Comment from "./Comment";
import { JsonConfig } from "../API/AxiosModule";
import CommentForm from "./CommentForm";
import jwtDecode from "jwt-decode";

interface CommentListProps {
  handleShow: () => void;
  postId: number | string;
}

interface DecodedToken {
  id: string;
}

interface Comments {
  commentId: number;
  content: string;
  createdAt: string;
  imgPath: string;
  memberId: number;
  nickName: string;
}
[];

const CommentList = (props: CommentListProps) => {
  const { postId } = props;
  const [userId, setUserId] = useState<number | undefined>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastCommentId, setLastCommentId] = useState();
  const target = useRef<HTMLDivElement | null>(null);

  //토큰에서 유저아이디 파싱
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      console.log(Number(decodeToken.id));
      setUserId(Number(decodeToken.id));
    }
  }, [accessToken]);

  //  댓글 불러오는 api
  const getFirstCommentData = useCallback(async () => {
    await JsonConfig("get", `api/comment/basic/${postId}`, null).then((res) => {
      console.log(res);
      setComments(res.data.data);
      setLoading(false);
      setLastCommentId(res.data.data[res.data.data.length - 1]?.commentId);
    });
  }, [postId]);

  //첫 화면 댓글 가져오기
  useEffect(() => {
    if (!userId) return;
    getFirstCommentData();
  }, [userId, getFirstCommentData]);

  //댓글 무한스크롤
  const loadMore = useCallback(async () => {
    if (lastCommentId) {
      const params = { lastCommentId: lastCommentId, size: 10 };
      await JsonConfig("get", `api/comment/${postId}`, null, params).then((res) => {
        console.log(res);
        setComments((prev: Comments[]) => [...prev, ...res.data.data]);
        setLoading(false);
        setLastCommentId(res.data.data[res.data.data.length - 1]?.commentId);
      });
    }
  }, [lastCommentId, postId]);

  console.log(`loading : ${loading}`);
  console.log(comments);
  console.log("lastCommentId : ", lastCommentId);

  //intersection callback 함수 작성
  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      console.log("entry", entry);
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    [loadMore]
  );

  //관찰자가 target을 관찰시작
  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, {
      threshold: 1,
    });
    observer.observe(target.current as Element);
    return () => {
      observer.disconnect();
    };
  }, [intersectionCallback]);

  return (
    <>
      <section className="pb-20 mb-10">
        {comments &&
          comments.map((co, i) => {
            return <Comment key={i} commentData={co} comments={comments} setComments={setComments} userId={userId} />;
          })}{" "}
      </section>{" "}
      <div ref={target}></div>
      <CommentForm postId={postId} comments={comments} setComments={setComments} />
    </>
  );
};

export default CommentList;
