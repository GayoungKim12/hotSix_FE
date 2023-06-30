import { Dispatch, SetStateAction } from "react";
import { JsonConfig } from "../API/AxiosModule";

interface Board {
  postId: number;
  nickName: string;
  address: string;
  likesFlag: boolean;
  userFile: string;
  createdAt: string;
  gender: number;
  content: string;
  roomFiles: string;
  commentCount: string;
  memberId: number;
}
interface RegionProps {
  regionId: number;
  sido: string;
  sigg: string;
}

interface RegionAllProps {
  setRegionList: Dispatch<SetStateAction<RegionProps[]>>;
  setUserRegion: Dispatch<SetStateAction<number | undefined>>;
  setRegionId: Dispatch<SetStateAction<number | undefined>>;
  regionId: number | undefined;
  userId: number | undefined;
}

interface GetFindRoomProps {
  setBoardOneList: Dispatch<SetStateAction<Board[]>>;
  boardOneOffset: number;
  regionId?: number;
  lastPostId: number | null;
  setLastPostId: Dispatch<SetStateAction<number | null>>;
  userId: number | undefined;
}

interface GetHasRoomProps {
  setBoardTwoList: Dispatch<SetStateAction<Board[]>>;
  boardTwoOffset: number;
  regionId?: number;
  lastPostId: number | null;
  setLastPostId: Dispatch<SetStateAction<number | null>>;
  userId: number | undefined;
}

//첫 화면 지역데이터 다 가져오기
export async function regionAll({ setRegionList, setUserRegion, setRegionId, regionId, userId }: RegionAllProps) {
  await JsonConfig("get", `api/main/${userId}`, null, undefined)
    .then((response) => {
      console.log(response.data);
      setRegionList(response.data.regionMainDtoList);
      setUserRegion(response.data.regionId);
      if (regionId === undefined) {
        setRegionId(response.data.regionId);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// "방구해요" 게시물 가져오기
export async function getFindRoomPostData({ setBoardOneList, boardOneOffset, regionId, lastPostId, setLastPostId, userId }: GetFindRoomProps) {
  if (regionId && boardOneOffset === 0) {
    const params = { size: 10, lastPostId: null };
    await JsonConfig("get", `api/main/${userId}/${regionId}/1`, null, params)
      .then((response) => {
        console.log(response.data);
        setBoardOneList(response.data.postMainDtoList);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (regionId && lastPostId !== null) {
    const params = { size: 10, lastPostId: lastPostId };
    await JsonConfig("get", `api/main/${userId}/${regionId}/1`, null, params)
      .then((response) => {
        console.log(response.data);
        setBoardOneList((prev) => [...prev, ...response.data.postMainDtoList]);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
        console.log("된거냐옹");
      });
  }
}

//"방 있어요" 게시물 가져오기
export async function getHasRoomPostData({ setBoardTwoList, boardTwoOffset, regionId, lastPostId, setLastPostId, userId }: GetHasRoomProps) {
  if (regionId && boardTwoOffset === 0) {
    const params = { size: 10, lastPostId: null };
    await JsonConfig("get", `api/main/${userId}/${regionId}/2`, null, params)
      .then((response) => {
        console.log(response.data);
        setBoardTwoList(response.data.postMainDtoList);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (regionId && lastPostId !== null) {
    const params = { size: 10, lastPostId: lastPostId };
    await JsonConfig("get", `api/main/${userId}/${regionId}/2`, null, params)
      .then((response) => {
        console.log(response.data);
        setBoardTwoList((prev) => [...prev, ...response.data.postMainDtoList]);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
