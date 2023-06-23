import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { GoKebabHorizontal } from "react-icons/go";
import PostToolButtons from "../common/PostToolButtons";
import { FaUser } from "react-icons/fa";

interface Props {
  showPostButtons: boolean;
  setShowPostButtons: React.Dispatch<React.SetStateAction<boolean>>;
  board: {
    postId: number;
    nickName: string;
    address: string;
    likesFlag: boolean;
    userFile: string;
    createdAt: string;
    gender: number;
    content: string;
    roomFiles: string[];
    commentCount: string;
  };
}

const BoardCard: React.FC<Props> = ({
  showPostButtons,
  setShowPostButtons,
  board,
}: Props) => {
  const postButtonOpen = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setShowPostButtons(true);
  };

  const onClickHeart = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="mt-6">
        <div className="relative bg-white rounded-lg m-4 p-4 drop-shadow-xl">
          <section className="cursor-pointer">
            <article className="flex">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="relative flex justify-center items-center w-12 h-12 border-2 rounded-full bg-white text-black overflow-hidden">
                    {board.userFile?.length ? (
                      <img
                        className="w-full h-full object-cover"
                        src={board.userFile}
                        alt={`${board.nickName}의 프로필 이미지`}
                      />
                    ) : (
                      <div
                        className={
                          "absolute top-3 flex justify-center items-center text-4xl text-main-200"
                        }
                      >
                        <FaUser />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-black">
                      {board.nickName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {board.createdAt}
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 border-0 text-lg rounded-full focus:outline-0 hover:bg-main-200"
                  onClick={postButtonOpen}
                >
                  <GoKebabHorizontal />
                </button>
              </div>
            </article>

            <article className="m-4 text-sm">
              <div>성별 : {board.gender === 1 ? "남성" : "여성"}</div>
              <div>지역 : {board.address}</div>
              <div>
                내용 :{" "}
                {board.content.length > 5
                  ? `${board.content.substr(0, 5) + "..."}`
                  : board.content}
              </div>
            </article>
          </section>

          {board.roomFiles[0].length > 0 && (
            <div className="inline-flex flex-col items-center justfiy-center">
              <img
                src={board.roomFiles[0]}
                className=" w-full rounded-lg bg-black"
                draggable="false"
              />
            </div>
          )}

          <section className="flex justify-between items-center px-1">
            <article className="flex items-center">
              <div className="text-indigo-300">
                <BiComment className="text-2xl" />
              </div>
              <div className="ml-1">{board.commentCount}</div>
            </article>

            <article className="flex">
              <AiFillHeart
                className="cursor-pointer text-red-500 text-2xl"
                onClick={onClickHeart}
              />

              <span className="text-indigo-300">
                <AiOutlineHeart
                  className="cursor-pointer text-2xl"
                  onClick={onClickHeart}
                />
              </span>
            </article>
          </section>
        </div>
      </div>
      {showPostButtons && (
        <PostToolButtons
          handleShow={() => setShowPostButtons(false)}
          postId={board.postId}
        />
      )}
    </>
  );
};

export default BoardCard;
