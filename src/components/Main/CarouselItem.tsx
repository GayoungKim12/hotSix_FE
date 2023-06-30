interface PropsItem {
  item: { description: number; imageURL: string };
}

const CarouselItem = ({ item }: PropsItem) => {
  return (
    <>
      <img src={item.imageURL} className=" w-full rounded-lg bg-black" draggable="false" />
    </>
  );
};

export default CarouselItem;
