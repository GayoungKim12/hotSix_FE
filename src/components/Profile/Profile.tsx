const Profile = () => {
  return (
    <>
      <div className="flex flex-col gap-2 pt-4 px-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border-2 rounded-full bg-white text-black"></div>
          <div className="text-lg font-semibold text-black">닉네임</div>
        </div>
        <div className="flex flex-col items-start gap-0.5 text-sm">
          <div>성별</div>
          <div>생일</div>
          <div>서울특별시 서대문구</div>
          <div>#비흡연 #반려동물</div>
          <div>자기소개</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
