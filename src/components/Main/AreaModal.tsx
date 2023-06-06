const AreaModal = () => {
  const address = [
    {
      시: "서울",
      구: "강남구",
    },
    {
      시: "서울",
      구: "강동구",
    },
    {
      시: "부산",
      구: "강서구",
    },
    {
      시: "부산",
      구: "금정구",
    },
    {
      시: "대구",
      구: "남구",
    },
    {
      시: "대구",
      구: "북구",
    },
  ];
  //주소데이터에서 '시' 만 가져오기(중복포함)
  const siAddressOverlap = address.map((ad) => {
    return ad.시;
  });
  //'시' 데이터 가져온 거 중복제거
  const siAddress = siAddressOverlap.filter(
    (ad, i) => siAddressOverlap.indexOf(ad) === i
  );

  const SeoulAddress = address.filter((ad) => {
    return ad.시.includes("서울");
  });
  const guAddress = SeoulAddress.map((a) => {
    return a.구;
  });
  console.log(guAddress);

  return (
    <>
      <section className="flex absolute  w-full  border-t border-gray bg-white z-10 ">
        <div className="bg-indigo-300">
          <ul>
            {siAddress.map((si) => {
              return (
                <li key={si} className="px-4 py-2">
                  {si}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          전체
          <ul>
            {guAddress.map((g) => {
              return <li key={g}>{g}</li>;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AreaModal;
