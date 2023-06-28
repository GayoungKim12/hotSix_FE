import { useState, useEffect, useRef, useCallback } from "react";
import Comment from "./Comment";
import { JsonConfig } from "../API/AxiosModule";
import CommentForm from "./CommentForm";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface CommentListProps {
  handleShow: () => void;
  postId: number | string;
}

interface DecodedToken {
  id: string;
}

const CommentList = (props: CommentListProps) => {
  const { postId } = props;
  const [userId, setUserId] = useState();

  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [lastPostId, setLastPostId] = useState();
  const target = useRef(null);
  const [more, setMore] = useState(true);

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
  const getFirstCommentData = async () => {
    await axios
      .get(`http://43.200.78.88:8080/api/comment/basic/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { size: 10, lastPostId: lastPostId },
      })
      .then((res) => {
        console.log(res);
        setComments(res.data.data);
        setLoading(false);
      });
  };

  //첫 화면 댓글 가져오기
  useEffect(() => {
    if (!userId) return;
    getFirstCommentData();
  }, [userId]);

  console.log(`offset : ${offset}`);
  console.log(`loading : ${loading}`);
  console.log(comments);

  //intersection callback 함수 작성
  const intersectionCallback = useCallback((entries) => {
    const entry = entries[0];
    console.log("entry", entry);
    if (entry.isIntersecting) {
      console.log("이제됨?");
    }
  }, []);

  //관찰자가 target을 관찰시작
  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, {
      threshold: 1,
    });
    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [intersectionCallback]);

  return (
    <>
      <section className="pb-16">
        {comments &&
          comments.map((co, i) => {
            return (
              <Comment
                key={i}
                commentData={co}
                comments={comments}
                setComments={setComments}
                accessToken={accessToken}
                userId={userId}
              />
            );
          })}{" "}
        <div ref={target}></div>
      </section>{" "}
      <CommentForm
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
};

export default CommentList;
