interface CarouselItemProps {
  item: string;
}

const CarouselItem = (props: CarouselItemProps) => {
  return (
    <>
      <img src={props.item} className=" w-full rounded-lg bg-black" draggable="false" />
    </>
  );
};

export default CarouselItem;
