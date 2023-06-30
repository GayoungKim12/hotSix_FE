import Header from "../components/Main/Header";
import Footer from "../components/common/Footer";
import { useState, useEffect, useCallback, useRef } from "react";
import BoardCard from "../components/Main/BoardCard";
import PostToolButtons from "../components/common/PostToolButtons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [userId, setUserId] = useState();
  const [lastPostId, setLastPostId] = useState();
  const [showPostButtons, setShowPostButtons] = useState(false);
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const target = useRef(null);

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

  //좋아요 누른 게시물 불러오는 첫 화면
  useEffect(() => {
    if (!userId) return;
    const getLikesData = async () => {
      if (!lastPostId) {
        await axios
          .get(`http://43.200.78.88:8080/api/membership/like/${userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              lastPostId: null,
              size: 5,
            },
          })
          .then((response) => {
            console.log(response.data);
            setCartList(response.data.likeListPost);
            setLastPostId(response.data.lastPostId);
          });
      }
    };
    getLikesData();
  }, [userId]);

  //좋아요 누른 게시물 무한스크롤로 가져오기
  const loadMore = useCallback(async () => {
    if (lastPostId) {
      try {
        const response = await axios.get(`http://43.200.78.88:8080/api/membership/like/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            lastPostId: lastPostId,
            size: 5,
          },
        });
        console.log(response.data);
        setCartList((prev) => [...prev, ...response.data.likeListPost]);
        setLastPostId(response.data.lastPostId);
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId, accessToken, lastPostId]);

  //intersection callback 함수 작성
  const intersectionCallback = useCallback(
    (entries) => {
      const entry = entries[0];
      console.log("entry", entry);
      if (entry.isIntersecting) {
        console.log("이제됨?");
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
    observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, [intersectionCallback]);
  console.log(`target.current :`, target.current);
  console.log(`lastPostId : ${lastPostId}`);
  console.log(`cartList :`, cartList);
  console.log(`loading :${isLoading}`);
  console.log(`offset : ${offset}`);

  console.log(cartList);
  return (
    <>
      <div className="h-full bg-main-100">
        <Header />

        <section className=" mb-20 pb-10">
          {cartList?.map((cart) => {
            return (
              <div
                onClick={() => {
                  navigate(`/detail/${cart.postId}`);
                }}
                key={cart.postId}
              >
                <BoardCard board={cart} setShowPostButtons={setShowPostButtons} accessToken={accessToken} userId={userId} />
              </div>
            );
          })}
          <div ref={target}></div>
        </section>
      </div>

      <Footer selected={true} />
      {showPostButtons && <PostToolButtons handleShow={() => setShowPostButtons(false)} setShowPostButtons={setShowPostButtons} />}
    </>
  );
};

export default CartPage;
