import BoardCard from "../components/Main/BoardCard";
import Footer from "../components/Main/Footer";
import Header from "../components/Main/Header";
import { RxTriangleDown } from "react-icons/rx";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import AreaModal from "../components/Main/AreaModal";

const MainPage = () => {
  const [isSelectedRoom, setIsSelectedRoom] = useState(true);
  const [isSelectedNoRoom, setIsSelectedNoRoom] = useState(false);
  const [activeAreaModal, setActiveAreaModal] = useState(false);

  const handleRoom = () => {
    setIsSelectedRoom(true);
    setIsSelectedNoRoom(false);
  };

  const handleNoRoom = () => {
    setIsSelectedNoRoom(true);
    setIsSelectedRoom(false);
  };

  const handleAreaModal = () => {
    setActiveAreaModal(!activeAreaModal);
  };
  return (
    <>
      <div className="bg-main-100 h-screen">
        <Header />
        <section>
          <div className="relative">
            <div className="px-4 py-2 text-center bg-white">지역</div>
            <div
              className="absolute bottom-2 right-2"
              onClick={handleAreaModal}
            >
              <RxTriangleDown className="text-3xl text-main-300" />
            </div>{" "}
            {activeAreaModal && <AreaModal />}
          </div>

          <div className="flex justify-evenly mt-4">
            <button
              onClick={handleRoom}
              className={`px-9 py-2 rounded-full drop-shadow-xl  ${
                isSelectedRoom ? "bg-main-400 text-white" : " bg-white"
              }`}
            >
              방 있어요
            </button>
            <button
              onClick={handleNoRoom}
              className={`px-9 py-2 rounded-full drop-shadow-xl  ${
                isSelectedNoRoom ? "bg-main-400 text-white" : " bg-white"
              }`}
            >
              방 없어요
            </button>
          </div>
        </section>

        <section>
          <BoardCard />
          <div className="flex justify-end mb-14 pt-1 pb-6 mr-5">
            <div className="fixed bottom-20 right-5 flex justify-center items-center w-12 h-12 bg-indigo-300 rounded-full">
              <FaPencilAlt className="cursor-pointer text-2xl" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
