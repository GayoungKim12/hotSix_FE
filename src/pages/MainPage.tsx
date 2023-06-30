import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/common/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState, useCallback } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsGenderFemale } from "react-icons/bs";
import AreaModal from "../components/Main/AreaModal";
import { useNavigate } from "react-router-dom";
import { SetStateAction, useAtom } from "jotai";
import { Dispatch } from "react";
import RoomExistence from "../components/Main/RoomExistence";
import { getFindRoomPostData, getHasRoomPostData, regionAll } from "../components/Main/ApiCall";
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
  boardOneOffset: number;
  regionId?: number;
  lastPostId: number | null;
  setLastPostId: Dispatch<SetStateAction<number | null>>;
  userId: number | undefined;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useAtom(isSelectedFindRoomAtom);
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useAtom(isSelectedHasRoomAtom);
  const [activeAreaModal, setActiveAreaModal] = useState<boolean>(false);
  const [showPostButtons, setShowPostButtons] = useState<boolean>(false);
  const [boardOneList, setBoardOneList] = useState<Board[]>([]);
  const [boardTwoList, setBoardTwoList] = useState<Board[]>([]);
  const [regionList, setRegionList] = useState<RegionProps[]>([]);
  const [regionName, setRegionName] = useState<undefined | string>();
  const [userRegion, setUserRegion] = useState<number | undefined>();
  const [regionId, setRegionId] = useAtom(regionIdAtom);
  const [boardOneOffset, setBoardOneOffset] = useState<number>(0);
  const [boardTwoOffset, setBoardTwoOffset] = useState<number>(0);
  const [userId, setUserId] = useState<number | undefined>();
  const [lastPostId, setLastPostId] = useState<number | null>(null);

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
  const getFindRoomPostDataCall = useCallback(
    async ({ setBoardOneList, boardOneOffset, regionId, lastPostId, setLastPostId, userId }: GetFindRoomProps) => {
      await getFindRoomPostData({ setBoardOneList, boardOneOffset, regionId, lastPostId, setLastPostId, userId });
    },
    []
  );

  //방구해요 버튼 클릭 시
  const handleFindRoom = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setBoardTwoList([]);
    setBoardOneOffset(0);
    setIsSelectedHasRoom(false);
    if (boardOneOffset === 0) {
      getFindRoomPostData({
        setBoardOneList,
        boardOneOffset,
        regionId,
        lastPostId,
        setLastPostId,
        userId,
      });
    }
    setIsSelectedFindRoom(true);
  };

  //방 있어요 버튼 클릭 시
  const handleHasRoom = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setBoardOneList([]);
    setBoardTwoOffset(0);
    setIsSelectedFindRoom(false);
    if (boardTwoOffset === 0) {
      getHasRoomPostData({
        setBoardTwoList,
        boardTwoOffset,
        regionId,
        lastPostId,
        setLastPostId,
        userId,
      });
    }
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
        await getFindRoomPostDataCall({ setBoardOneList, boardOneOffset, regionId, lastPostId, setLastPostId, userId });
      } else if (userRegion && isSelectedHasRoom && userId) {
        await getHasRoomPostData({
          setBoardTwoList,
          boardTwoOffset,
          regionId,
          lastPostId,
          setLastPostId,
          userId,
        });
      }
    };
    fetchData();
  }, [
    boardOneOffset,
    boardTwoOffset,
    getFindRoomPostDataCall,
    isSelectedFindRoom,
    isSelectedHasRoom,
    lastPostId,
    regionId,
    regionList,
    userId,
    userRegion,
  ]);

  //무한스크롤구현 (방구해요 / 방있어요 )
  useEffect(() => {
    const handScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && isSelectedFindRoom) {
        setBoardOneOffset(boardOneOffset + 1);
      }
    };

    window.addEventListener("scroll", handScroll);

    return () => {
      window.removeEventListener("scroll", handScroll);
    };
  }, [boardOneOffset, isSelectedFindRoom]);

  useEffect(() => {
    const handScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && isSelectedHasRoom) {
        setBoardTwoOffset(boardTwoOffset + 1);
      }
    };
    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, [boardTwoOffset, isSelectedHasRoom]);

  // console.log(regionList);
  // console.log(`userId : ${userId}`);
  console.log("boardOneList :", boardOneList);
  console.log("boardTwoList :", boardTwoList);
  console.log(`boardOneOffset : ${boardOneOffset}`);
  console.log(`boardTwoOffset : ${boardTwoOffset}`);
  // console.log(`regionId : ${regionId}`);
  // console.log(`userRegion : ${userRegion}`);
  // console.log(`lastPostId : ${lastPostId}`);

  //지역 선택 시 해당 게시물 가져오기
  const handleRegionArea = (region: RegionProps) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (userId) {
      if (isSelectedFindRoom) {
        setBoardOneOffset(0);
      }
      if (isSelectedHasRoom) {
        setBoardTwoOffset(0);
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
                  <div
                    onClick={() => {
                      navigate(`/detail/${b.postId}`);
                    }}
                    key={i}
                    className={i === 0 ? "mt-12" : ""}
                  >
                    <BoardCard
                      showPostButtons={showPostButtons}
                      setShowPostButtons={setShowPostButtons}
                      board={b}
                      userId={userId}
                      boardList={boardOneList}
                      setBoardList={setBoardOneList}
                    />
                  </div>
                );
              })
            : boardTwoList?.map((b, i) => {
                return (
                  <div onClick={() => navigate(`/detail/${b.postId}`)} key={i}>
                    <BoardCard
                      showPostButtons={showPostButtons}
                      setShowPostButtons={setShowPostButtons}
                      board={b}
                      userId={userId}
                      boardList={boardTwoList}
                      setBoardList={setBoardTwoList}
                    />
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
      <Footer selected={false} userId={userId} />
    </>
  );
};

export default MainPage;
