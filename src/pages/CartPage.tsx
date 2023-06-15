import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import BoardCard from "../components/Main/BoardCard";
import { useAtom } from "jotai";
import PostToolButtons from "../components/common/PostToolButtons";
import { showPostButtonsAtom } from "./MainPage";

const CartPage = () => {
  const [showPostButtons, setShowPostButtons] = useAtom(showPostButtonsAtom);
  const [cartList, setCartList] = useState([]);
  console.log(cartList);
  useEffect(() => {
    axios
      .get("http://localhost:3001/postProjectionMainDtoList")
      .then((response) =>
        setCartList(
          response.data.filter((cart: { id: number; likes: boolean }) => {
            return cart.likes === true;
          })
        )
      );
  }, []);

  return (
    <>
      <div className="h-full">
        <Header />
        <section className="mt-20 mb-20">
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
