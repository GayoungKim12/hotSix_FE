import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/common/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState, useCallback, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import AreaModal from "../components/Main/AreaModal";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";
import RoomExistence from "../components/Main/RoomExistence";
import { getFindRoomPostData, getHasRoomPostData, loadMoreFindRoom, loadMoreHasRoom, regionAll } from "../components/Main/ApiCall";
import jwtDecode from "jwt-decode";
import { isSelectedFindRoomAtom, isSelectedHasRoomAtom, regionIdAtom } from "../components/Main/Jotai";

interface RegionProps {
  regionId: number;
  sido: string;
  sigg: string;
}

interface DecodedToken {
  id: string;
}

interface Board {
  postId: number;
  nickName: string;
  address: string;
  likesFlag: boolean;
  userFile: string;
  createdAt: string;
  gender: number;
  content: string;
  roomFiles: string;
  commentCount: string;
  memberId: number;
}

interface GetFindRoomProps {
  setBoardOneList: Dispatch<SetStateAction<Board[]>>;
  regionId?: number;
  setLastPostId: Dispatch<SetStateAction<number | null>>;
  userId: number | undefined;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useAtom(isSelectedFindRoomAtom);
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useAtom(isSelectedHasRoomAtom);
  const [activeAreaModal, setActiveAreaModal] = useState<boolean>(false);
  const [boardOneList, setBoardOneList] = useState<Board[]>([]);
  const [boardTwoList, setBoardTwoList] = useState<Board[]>([]);
  const [regionList, setRegionList] = useState<RegionProps[]>([]);
  const [regionName, setRegionName] = useState<undefined | string>();
  const [userRegion, setUserRegion] = useState<number | undefined>();
  const [regionId, setRegionId] = useAtom(regionIdAtom);
  const [userId, setUserId] = useState<number | undefined>();
  const [lastPostId, setLastPostId] = useState<number | null>(null);
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

  //방 구해요 게시물 불러오는 함수 useCallback 씌우기 (의존성 배열 issue)
  const getFindRoomPostDataCall = useCallback(async ({ setBoardOneList, regionId, setLastPostId, userId }: GetFindRoomProps) => {
    await getFindRoomPostData({ setBoardOneList, regionId, setLastPostId, userId });
  }, []);

  //방구해요 버튼 클릭 시
  const handleFindRoom = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setBoardTwoList([]);
    setIsSelectedHasRoom(false);
    getFindRoomPostData({
      setBoardOneList,
      regionId,
      setLastPostId,
      userId,
    });
    setIsSelectedFindRoom(true);
  };

  //방 있어요 버튼 클릭 시
  const handleHasRoom = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setBoardOneList([]);
    setIsSelectedFindRoom(false);
    getHasRoomPostData({
      setBoardTwoList,
      regionId,
      setLastPostId,
      userId,
    });

    setIsSelectedHasRoom(true);
  };

  //지역정보 (모달창) 보기
  const handleAreaModal = () => {
    setActiveAreaModal(!activeAreaModal);
  };

  //첫화면 지역데이터 가져오기
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (!userId) return;
    regionAll({
      setRegionList,
      setUserRegion,
      setRegionId,
      regionId,
      userId,
    });
  }, [regionId, setRegionId, setRegionList, userId]);

  //첫화면 모든지역 게시물 가져오기(방구해요)
  useEffect(() => {
    //화면에 표시되는 유저가 선택한 첫 지역담기
    const userRegionSigg = regionList?.filter((re) => {
      return re.regionId === regionId;
    });
    if (!userRegion && !userId) return;
    if (userRegion && userId) {
      setRegionName(userRegionSigg[0]?.sigg);
    }
    const fetchData = async () => {
      if (userRegion && isSelectedFindRoom && userId) {
        await getFindRoomPostDataCall({ setBoardOneList, regionId, setLastPostId, userId });
      } else if (userRegion && isSelectedHasRoom && userId) {
        await getHasRoomPostData({
          setBoardTwoList,
          regionId,
          setLastPostId,
          userId,
        });
      }
    };
    fetchData();
  }, [getFindRoomPostDataCall, isSelectedFindRoom, isSelectedHasRoom, regionId, regionList, userId, userRegion]);

  // intersection callback 함수 작성
  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      console.log("entry", entry);
      if (entry.isIntersecting) {
        console.log("교차");
        if (isSelectedFindRoom) {
          loadMoreFindRoom({ regionId, lastPostId, userId, setBoardOneList, setLastPostId });
        } else if (isSelectedHasRoom) {
          loadMoreHasRoom({ regionId, lastPostId, userId, setBoardTwoList, setLastPostId });
        }
      }
    },
    [isSelectedFindRoom, isSelectedHasRoom, lastPostId, regionId, userId]
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

  // console.log(regionList);
  // console.log(`userId : ${userId}`);
  console.log("boardOneList :", boardOneList);
  console.log("boardTwoList :", boardTwoList);
  // console.log(`regionId : ${regionId}`);
  // console.log(`userRegion : ${userRegion}`);
  // console.log(`lastPostId : ${lastPostId}`);

  //지역 선택 시 해당 게시물 가져오기
  const handleRegionArea = (region: RegionProps) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (userId) {
      if (isSelectedFindRoom) {
        getFindRoomPostData({ setBoardOneList, regionId, setLastPostId, userId });
      }
      if (isSelectedHasRoom) {
        getHasRoomPostData({
          setBoardTwoList,
          regionId,
          setLastPostId,
          userId,
        });
      }
      setActiveAreaModal(false);
      setRegionName(region.sigg);
      setRegionId(region.regionId);
    }
  };

  return (
    <>
      <div className="bg-main-100 h-full">
        <section className="fixed w-full z-20 top-0 left-0 shadow bg-main-100">
          <Header />
          <div className="relative mt-20">
            <div className="px-4 py-2 text-center bg-white">{regionName}</div>
            <div className="absolute bottom-2 right-2 cursor-pointer" onClick={handleAreaModal}>
              <RxTriangleDown className="text-3xl text-main-300" />
            </div>
            {activeAreaModal && <AreaModal regionList={regionList} handleRegionArea={handleRegionArea} />}
          </div>

          <RoomExistence handleFindRoom={handleFindRoom} handleHasRoom={handleHasRoom} />
        </section>

        <section className=" mt-20 pt-20">
          {boardOneList?.length > 0
            ? boardOneList.map((b, i) => {
                return (
                  <div key={i} className={i === 0 ? "mt-12" : ""}>
                    <BoardCard board={b} userId={userId} boardList={boardOneList} setBoardList={setBoardOneList} />
                  </div>
                );
              })
            : boardTwoList?.map((b, i) => {
                return (
                  <div key={i} className={i === 0 ? "mt-12" : ""}>
                    <BoardCard board={b} userId={userId} boardList={boardTwoList} setBoardList={setBoardTwoList} />
                  </div>
                );
              })}

          <div className="flex justify-end mb-14 pt-1 pb-6 mr-5">
            <div
              className="fixed bottom-20 right-5 flex justify-center items-center w-12 h-12 bg-indigo-300 rounded-full"
              onClick={() => navigate("/post")}
            >
              <FaPencilAlt className="cursor-pointer text-2xl" />
            </div>
          </div>
        </section>
      </div>
      <div ref={target}></div>
      <Footer selected={false} userId={userId} />
    </>
  );
};

export default MainPage;
