const SearchCard = () => {
  return (
    <>
      <div className="flex  justify-center items-center bg-white mt-6 mx-4 p-4 rounded-lg drop-shadow-xl min-h-400">
        <div className="flex flex-col">
          <div className="mt-4 mb-2">최근 검색어</div>
          <div>
            <div>
              <div className="bg-indigo-50 p-4 min-h-200 rounded-lg ">
                검색어가 없습니다 😅
                <div className="flex justify-center items-center mt-5 text-7xl ">
                  <p>텅</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
