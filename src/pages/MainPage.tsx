import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import AreaModal from "../components/Main/AreaModal";
import { useNavigate } from "react-router-dom";
import PostToolButtons from "../components/common/PostToolButtons";
import axios from "axios";
import { atom, useAtom } from "jotai";

export const showPostButtonsAtom = atom(false);

const MainPage = () => {
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useState(true);
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useState(false);
  const [activeAreaModal, setActiveAreaModal] = useState(false);
  const [showPostButtons, setShowPostButtons] = useAtom(showPostButtonsAtom);
  const [boardList, setBoardList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [regionName, setRegionName] = useState("지역");
  const [regionId, setRegionId] = useState();
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();
  const URL = "http://localhost:3001";

  const handleFindRoom = () => {
    setIsSelectedFindRoom(true);
    setIsSelectedHasRoom(false);
    getFindRoomPostData();
  };

  const handleHasRoom = () => {
    setIsSelectedHasRoom(true);
    setIsSelectedFindRoom(false);
    getHasRoomPostData();
  };

  const handleAreaModal = () => {
    setActiveAreaModal(!activeAreaModal);
  };

  //첫화면 지역데이터 가져오기
  useEffect(() => {
    axios
      .get(`${URL}/regionMainDtoList`)
      .then((response) => {
        setRegionList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //첫화면 방구해요/방있어요 버튼내용 가져오기
  useEffect(() => {
    axios.get(`${URL}/boardList`).then((response) => {
      return setRoomList(response.data);
    });
  }, []);

  //첫화면 모든지역 게시물 가져오기(방구해요)
  useEffect(() => {
    getFindRoomPostData();
  }, []);

  async function getFindRoomPostData() {
    if (regionId) {
      await axios
        .get(`${URL}/postProjectionMainDtoList`)
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return regionId === data.region_id && data.board_id === 1;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .get(`${URL}/postProjectionMainDtoList`)
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return data.board_id === 1;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //방 있어요 데이터 가져오기
  async function getHasRoomPostData() {
    if (regionId) {
      await axios
        .get(`${URL}/postProjectionMainDtoList`)
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return regionId === data.region_id && data.board_id === 2;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .get(`${URL}/postProjectionMainDtoList`)
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return data.board_id === 2;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //지역마다 데이터 가져오기
  const handleRegionArea = (region) => {
    if (isSelectedFindRoom) {
      axios
        .get(`${URL}/postProjectionMainDtoList`) //
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return data.region_id === region.region_id && data.board_id === 1;
            })
          );
        });
    } else {
      axios
        .get(`${URL}/postProjectionMainDtoList`) //
        .then((response) => {
          setBoardList(
            response.data.filter((data) => {
              return data.region_id === region.region_id && data.board_id === 2;
            })
          );
        });
    }

    setActiveAreaModal(false);
    setRegionName(region.sigg);
    setRegionId(region.region_id);
  };

  //모든 지역 데이터 가져오기
  const handleRegionAll = () => {
    if (isSelectedFindRoom) {
      axios
        .get(`${URL}/postProjectionMainDtoList`) //
        .then((response) => {
          return setBoardList(
            response.data.filter((data) => {
              return data.board_id === 1;
            })
          );
        });
    } else {
      axios
        .get(`${URL}/postProjectionMainDtoList`) //
        .then((response) => {
          return setBoardList(
            response.data.filter((data) => {
              return data.board_id === 2;
            })
          );
        });
    }
    setActiveAreaModal(false);
    setRegionName("지역");
    setRegionId(undefined);
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
                handleRegionAll={handleRegionAll}
                handleRegionArea={handleRegionArea}
              />
            )}
          </div>

          <div className="flex justify-evenly mt-4">
            <button
              onClick={handleFindRoom}
              className={`px-9 py-2 rounded-full drop-shadow-xl  ${
                isSelectedFindRoom ? "bg-main-400 text-white" : " bg-white"
              }`}
            >
              {roomList[0]?.name}
            </button>
            <button
              onClick={handleHasRoom}
              className={`px-9 py-2 rounded-full drop-shadow-xl  ${
                isSelectedHasRoom ? "bg-main-400 text-white" : " bg-white"
              }`}
            >
              {roomList[1]?.name}
            </button>
          </div>
        </section>

        <section>
          {boardList.map((b, i) => {
            return (
              <div key={i}>
                <BoardCard setShowPostButtons={setShowPostButtons} board={b} />
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
