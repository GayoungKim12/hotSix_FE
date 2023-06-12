import CarouselItem from "./CarouselItem";
import { BsDot } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const items = [
    {
      description: 1,
      imageURL: "./logo.png",
    },
    {
      description: 2,
      imageURL: "./logo.png",
    },
    {
      description: 3,
      imageURL: "./logo.png",
    },
  ];

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
  };

  //마우스event로 캐러셀 사진 넘기기
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };

  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;
    if (mouseDownClientX !== 0 && dragSpaceX > 50 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        updateIndex((prev) => prev + 1);
      } else if (mouseUpClientX > mouseDownClientX) {
        updateIndex((prev) => prev - 1);
      }
    }
  }, [mouseUpClientX]);

  const handleTouchStart = () => {};
  const handleTouchMove = () => {};
  const handleTouchEnd = () => {};

  return (
    <>
      <div className=" flex flex-col justify-center overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-300"
          //
          style={{
            transform: `translate(-${activeIndex * 100}%) `,
          }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item) => {
            return (
              <div className="inline-flex flex-col items-center justfiy-center" key={item.description}>
                <CarouselItem item={item} />
              </div>
            );
          })}
        </div>
        <div className="flex justify-evenly ">
          <div className="flex absolute bottom-16">
            <button onClick={() => updateIndex(activeIndex - 1)} className="text-white cursor-default">
              <IoIosArrowBack />
            </button>
            <div className="flex flex-row justify-center -space-x-3">
              {items.map((item, idx) => {
                return (
                  <div
                    key={item.description}
                    onClick={() => {
                      updateIndex(idx);
                    }}
                  >
                    <BsDot className={`text-3xl ${activeIndex === idx ? "text-indigo-400" : "text-indigo-200"}`} />
                  </div>
                );
              })}{" "}
            </div>

            <button onClick={() => updateIndex(activeIndex + 1)} className="text-white cursor-default">
              <IoIosArrowForward />
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Carousel;
