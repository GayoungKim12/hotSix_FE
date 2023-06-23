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
import {
  getFindRoomPostData,
  getHasRoomPostData,
  regionAll,
} from "../components/Main/ApiCall";
import jwtDecode from "jwt-decode";

//관심목록 페이지 예정
export const isSelectedFindRoomAtom = atom<boolean>(true);
export const isSelectedHasRoomAtom = atom<boolean>(false);

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
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useAtom(
    isSelectedFindRoomAtom
  );
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useAtom(
    isSelectedHasRoomAtom
  );
  const [activeAreaModal, setActiveAreaModal] = useState<boolean>(false);
  const [showPostButtons, setShowPostButtons] = useState<boolean>(false);
  const [boardOneList, setBoardOneList] = useState<Board[]>([]);
  const [boardTwoList, setBoardTwoList] = useState<Board[]>([]);
  const [regionList, setRegionList] = useState<RegionProps[]>([]);
  const [regionName, setRegionName] = useState<undefined | string>();
  const [userRegion, setUserRegion] = useState<number | undefined>();
  const [regionId, setRegionId] = useState<number | undefined>();
  const [boardOneOffset, setBoardOneOffset] = useState(0);
  const [boardTwoOffset, setBoardTwoOffset] = useState(0);
  const [userId, setUserId] = useState(0);
  const [lastPostId, setLastPostId] = useState(null);

  //토큰에서 유저아이디 파싱
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;
    const decodeToken = jwtDecode<DecodedToken>(accessToken);

    if (decodeToken.id) {
      // console.log(Number(decodeToken.id));
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
    if (!userId) return;
    regionAll({
      REGION_URL,
      setRegionList,
      setUserRegion,
      setRegionId,
      accessToken,
    });
  }, [setRegionList, userId]);

  //화면에 표시되는 유저가 선택한 첫 지역담기
  const userRegionSigg = regionList.filter((re) => {
    return re.regionId === userRegion;
  });

  //첫화면 모든지역 게시물 가져오기(방구해요)
  useEffect(() => {
    if (userRegion) {
      setRegionName(userRegionSigg[0]?.sigg);
    }
    const fetchData = async () => {
      if (userRegion && isSelectedFindRoom) {
        await getFindRoomPostData({
          setBoardOneList,
          boardOneOffset,
          regionId,
          lastPostId,
          setLastPostId,
          accessToken,
          SERVER_BORDONE,
        });
      } else if (userRegion && isSelectedHasRoom) {
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
      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && isSelectedFindRoom) {
        setBoardOneOffset(boardOneOffset + 1);
      }
    };
    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, [boardOneOffset, isSelectedFindRoom]);

  useEffect(() => {
    const handScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && isSelectedHasRoom) {
        setBoardTwoOffset(boardTwoOffset + 1);
      }
    };
    window.addEventListener("scroll", handScroll);
    return () => window.removeEventListener("scroll", handScroll);
  }, [boardTwoOffset, isSelectedHasRoom]);

  //방구해요, 방있어요 무한스크롤
  useEffect(() => {
    if (isSelectedFindRoom) {
      getFindRoomPostData({
        setBoardOneList,
        boardOneOffset,
        regionId,
        lastPostId,
        setLastPostId,
        accessToken,
        SERVER_BORDONE,
      });
    } else if (isSelectedHasRoom) {
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
  // console.log(boardOneList);
  // console.log(boardTwoList);
  // console.log(`boardOneOffset : ${boardOneOffset}`);
  // console.log(`boardTwoOffset : ${boardTwoOffset}`);
  // // console.log(`regionId : ${regionId}`);
  // console.log(`lastPostId : ${lastPostId}`);

  //지역 선택 시 해당 게시물 가져오기
  const handleRegionArea = (region: RegionProps) => {
    if (isSelectedFindRoom) {
      setBoardOneOffset(0);
    }
    if (isSelectedHasRoom) {
      setBoardTwoOffset(0);
    }
    setActiveAreaModal(false);
    setRegionName(region.sigg);
    setRegionId(region.regionId);
  };

  return (
    <>
      <div className="bg-main-100 h-full">
        <Header />
        <section>
          <div className="relative">
            <div className="px-4 py-2 mt-20 text-center bg-white">
              {regionName}
            </div>
            <div
              className="absolute bottom-2 right-2"
              onClick={handleAreaModal}
            >
              <RxTriangleDown className="text-3xl text-main-300" />
            </div>{" "}
            {activeAreaModal && (
              <AreaModal
                regionList={regionList}
                handleRegionArea={handleRegionArea}
              />
            )}
          </div>

          <RoomExistence
            handleFindRoom={handleFindRoom}
            handleHasRoom={handleHasRoom}
          />
        </section>

        <section>
          {boardOneList.length > 0
            ? boardOneList.map((b, i) => {
                return (
                  <div onClick={() => navigate(`/detail/${b.postId}`)} key={i}>
                    <BoardCard
                      showPostButtons={showPostButtons}
                      setShowPostButtons={setShowPostButtons}
                      board={b}
                    />
                  </div>
                );
              })
            : boardTwoList.map((b, i) => {
                return (
                  <div onClick={() => navigate(`/detail/${b.postId}`)} key={i}>
                    <BoardCard
                      showPostButtons={showPostButtons}
                      setShowPostButtons={setShowPostButtons}
                      board={b}
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
