import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/common/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import AreaModal from "../components/Main/AreaModal";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import RoomExistence from "../components/Main/RoomExistence";
import { getFindRoomPostData, getHasRoomPostData, regionAll } from "../components/Main/ApiCall";
import jwtDecode from "jwt-decode";

//뒤로가기 눌렀을때 regionId, 방구해요/방있어요 버튼 유지를 위해서 전역변수로 설정
export const isSelectedFindRoomAtom = atom<boolean>(true);
export const isSelectedHasRoomAtom = atom<boolean>(false);
export const regionIdAtom = atom<number | undefined>();

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
  roomFiles: string[];
  commentCount: string;
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
  const [boardOneOffset, setBoardOneOffset] = useState(0);
  const [boardTwoOffset, setBoardTwoOffset] = useState(0);
  const [userId, setUserId] = useState();
  const [lastPostId, setLastPostId] = useState(null);

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

  const SERVER = `http://43.200.78.88:8080/api/main/${userId}`;

  //방 구해요 / 방 있어요 게시물 불러오는 api
  const SERVER_BORDONE = `${SERVER}/${regionId}/1`;
  const SERVER_BORDTWO = `${SERVER}/${regionId}/2`;

  //지역데이터들 불러오는 api
  const SERVER_REGION = `http://43.200.78.88:8080/api/main/${userId}`;
  const REGION_URL = `${SERVER_REGION}`;

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
        accessToken,
        SERVER_BORDONE,
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
        accessToken,
        SERVER_BORDTWO,
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
      REGION_URL,
      setRegionList,
      setUserRegion,
      setRegionId,
      accessToken,
      regionId,
    });
  }, [setRegionList, userId]);

  //화면에 표시되는 유저가 선택한 첫 지역담기
  const userRegionSigg = regionList.filter((re) => {
    return re.regionId === regionId;
  });

  //첫화면 모든지역 게시물 가져오기(방구해요)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (!userRegion && !userId) return;
    if (userRegion && userId) {
      setRegionName(userRegionSigg[0]?.sigg);
    }
    const fetchData = async () => {
      if (userRegion && isSelectedFindRoom && userId) {
        await getFindRoomPostData({
          setBoardOneList,
          boardOneOffset,
          regionId,
          lastPostId,
          setLastPostId,
          accessToken,
          SERVER_BORDONE,
        });
      } else if (userRegion && isSelectedHasRoom && userId) {
        await getHasRoomPostData({
          setBoardTwoList,
          boardTwoOffset,
          regionId,
          lastPostId,
          setLastPostId,
          accessToken,
          SERVER_BORDTWO,
        });
      }
    };
    fetchData();
  }, [userRegion]);

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

  //방구해요, 방있어요 무한스크롤
  useEffect(() => {
    if (isSelectedFindRoom && userId) {
      getFindRoomPostData({
        setBoardOneList,
        boardOneOffset,
        regionId,
        lastPostId,
        setLastPostId,
        accessToken,
        SERVER_BORDONE,
      });
    } else if (isSelectedHasRoom && userId) {
      getHasRoomPostData({
        setBoardTwoList,
        boardTwoOffset,
        regionId,
        lastPostId,
        setLastPostId,
        accessToken,
        SERVER_BORDTWO,
      });
    }
  }, [boardOneOffset, boardTwoOffset, regionId]);
  // console.log(regionList);
  // console.log(`userId : ${userId}`);
  console.log("boardOneList :", boardOneList);
  console.log("boardTwoList :", boardTwoList);
  console.log(`boardOneOffset : ${boardOneOffset}`);
  // console.log(`boardTwoOffset : ${boardTwoOffset}`);
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
          <div className="relative">
            <div className="px-4 py-2 text-center bg-white">{regionName}</div>
            <div className="absolute bottom-2 right-2" onClick={handleAreaModal}>
              <RxTriangleDown className="text-3xl text-main-300" />
            </div>{" "}
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
                      accessToken={accessToken}
                      userId={userId}
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
                      accessToken={accessToken}
                      userId={userId}
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
