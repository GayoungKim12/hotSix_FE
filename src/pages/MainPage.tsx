import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import AreaModal from "../components/Main/AreaModal";
import { useNavigate } from "react-router-dom";
import PostToolButtons from "../components/common/PostToolButtons";
import { atom, useAtom } from "jotai";
import RoomExistence from "../components/Main/RoomExistence";
import {
  getFindRoomPostData,
  getHasRoomPostData,
  regionAll,
} from "../components/Main/ApiCall";

export const showPostButtonsAtom = atom<boolean>(false);
//관심목록 페이지 예정
export const isSelectedFindRoomAtom = atom<boolean>(true);
export const isSelectedHasRoomAtom = atom<boolean>(false);

interface RegionProps {
  region_id: number;
  sido: string;
  sigg: string;
}

const MainPage = () => {
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useAtom(
    isSelectedFindRoomAtom
  );
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useAtom(
    isSelectedHasRoomAtom
  );
  const [activeAreaModal, setActiveAreaModal] = useState<boolean>(false);
  const [showPostButtons, setShowPostButtons] = useAtom(showPostButtonsAtom);
  const [boardOneList, setBoardOneList] = useState<string[]>([]);
  const [boardTwoList, setBoardTwoList] = useState<string[]>([]);
  const [regionList, setRegionList] = useState<string[]>([]);
  const [regionName, setRegionName] = useState();
  const [userRegion, setUserRegion] = useState<number | undefined>();
  const [regionId, setRegionId] = useState<number | undefined>();
  const [boardOneOffset, setBoardOneOffset] = useState(0);
  const [boardTwoOffset, setBoardTwoOffset] = useState(0);

  const navigate = useNavigate();

  const FAKE = "http://localhost:3001/postProjectionMainDtoList";
  const SERVER = `http://43.200.78.88:8080/main/유저아이디`;
  const BORDONE_URL = `${FAKE}?region_id=${regionId}&board_id=1`;
  const BORDTWO_URL = `${FAKE}?region_id=${regionId}&board_id=2`;

  const FAKE_REGION = "http://localhost:3001/main";
  const SERVER_REGION = "http://43.200.78.88:8080/main/유저아이디";
  const REGION_URL = `${FAKE_REGION}`;

  const handleFindRoom = () => {
    setBoardTwoList([]);
    setBoardOneOffset(0);
    setIsSelectedHasRoom(false);
    if (boardOneOffset === 0) {
      getFindRoomPostData({
        setBoardOneList,
        BORDONE_URL,
        boardOneOffset,
        regionId,
      });
    }
    setIsSelectedFindRoom(true);
  };

  const handleHasRoom = () => {
    setBoardOneList([]);
    setBoardTwoOffset(0);
    setIsSelectedFindRoom(false);
    if (boardTwoOffset === 0) {
      getHasRoomPostData({
        setBoardTwoList,
        BORDTWO_URL,
        boardTwoOffset,
        regionId,
      });
    }
    setIsSelectedHasRoom(true);
  };

  const handleAreaModal = () => {
    setActiveAreaModal(!activeAreaModal);
  };

  //첫화면 지역데이터 가져오기
  useEffect(() => {
    regionAll({ REGION_URL, setRegionList, setUserRegion, setRegionId });
  }, [setRegionList]);

  //화면에 표시되는 유저가 선택한 첫 지역담기
  const userRegionSigg = regionList.filter((re) => {
    return re.region_id === userRegion;
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
          BORDONE_URL,
          boardOneOffset,
          regionId,
        });
      } else if (userRegion && isSelectedHasRoom) {
        await getHasRoomPostData({
          setBoardTwoList,
          BORDTWO_URL,
          boardTwoOffset,
          regionId,
        });
      }
    };
    fetchData();
  }, [userRegion]);

  //무한스크롤구현
  useEffect(() => {
    const handScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight =
        document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && isSelectedFindRoom) {
        setBoardOneOffset(boardOneOffset + 5);
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
        setBoardTwoOffset(boardTwoOffset + 5);
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
        BORDONE_URL,
        boardOneOffset,
        regionId,
      });
    } else if (isSelectedHasRoom) {
      getHasRoomPostData({
        setBoardTwoList,
        BORDTWO_URL,
        boardTwoOffset,
        regionId,
      });
    }
  }, [boardOneOffset, boardTwoOffset, regionId]);
  // console.log(regionList);
  // console.log(boardOneList);
  // console.log(boardTwoList);
  // console.log(`boardOneOffset : ${boardOneOffset}`);
  // console.log(`boardTwoOffset : ${boardTwoOffset}`);
  // console.log(`regionId : ${regionId}`);

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
    setRegionId(region.region_id);
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
                  <div onClick={() => navigate(`/detail/${b.post_id}`)} key={i}>
                    <BoardCard
                      setShowPostButtons={setShowPostButtons}
                      board={b}
                    />
                  </div>
                );
              })
            : boardTwoList.map((b, i) => {
                return (
                  <div onClick={() => navigate(`/detail/${b.post_id}`)} key={i}>
                    <BoardCard
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
      <Footer selected={false} />
      {showPostButtons && (
        <PostToolButtons handleShow={() => setShowPostButtons(false)} />
      )}
    </>
  );
};

export default MainPage;
