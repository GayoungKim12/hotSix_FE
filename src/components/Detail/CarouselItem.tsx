import { useState } from "react";

interface CarouselItemProps {
  item: string;
}

const CarouselItem = (props: CarouselItemProps) => {
  const { item } = props;
  const [full, setFull] = useState(false);

  const handleClick = () => {
    setFull(!full);
  };

  return (
    <>
      <img
        src={item}
        onClick={handleClick}
        className={full ? "h-80 w-full object-cover" : "h-80 w-full object-contain"}
        draggable="false"
      />
    </>
  );
};

export default CarouselItem;
