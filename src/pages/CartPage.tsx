import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardCard from "../components/Main/BoardCard";
import { useAtom } from "jotai";
import PostToolButtons from "../components/common/PostToolButtons";
import {
  isSelectedFindRoomAtom,
  isSelectedHasRoomAtom,
  showPostButtonsAtom,
} from "./MainPage";
import RoomExistence from "../components/Main/RoomExistence";

const CartPage = () => {
  const [showPostButtons, setShowPostButtons] = useAtom(showPostButtonsAtom);
  const [isSelectedFindRoom, setIsSelectedFindRoom] = useAtom(
    isSelectedFindRoomAtom
  );
  const [isSelectedHasRoom, setIsSelectedHasRoom] = useAtom(
    isSelectedHasRoomAtom
  );
  const [cartList, setCartList] = useState([]);
  const postURL = "http://localhost:3001/postProjectionMainDtoList";
  const serverURL = "";

  const handleFindRoom = () => {
    setIsSelectedFindRoom(true);
    setIsSelectedHasRoom(false);
  };

  const handleHasRoom = () => {
    setIsSelectedFindRoom(false);
    setIsSelectedHasRoom(true);
  };
  useEffect(() => {
    axios.get(`${postURL}`).then((response) =>
      setCartList(
        response.data.filter((cart: { id: number; likes: boolean }) => {
          return cart.likes === true;
        })
      )
    );
  }, []);

  return (
    <>
      <div className="h-full bg-main-100">
        <Header />

        <section className="mt-10 mb-20">
          <div className="pt-9">
            <RoomExistence
              handleHasRoom={handleHasRoom}
              handleFindRoom={handleFindRoom}
            />
          </div>

          {cartList.map(
            (cart: {
              id: number;
              nick_name: string;
              address: string;
              likes: boolean;
            }) => {
              return (
                <BoardCard
                  board={cart}
                  key={cart.id}
                  setShowPostButtons={setShowPostButtons}
                />
              );
            }
          )}
        </section>
      </div>

      <Footer selected={true} />
      {showPostButtons && (
        <PostToolButtons handleShow={() => setShowPostButtons(false)} />
      )}
    </>
  );
};

export default CartPage;
