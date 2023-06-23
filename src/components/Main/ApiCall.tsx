import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Board {
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
}
interface RegionProps {
  regionId: number;
  sido: string;
  sigg: string;
}

interface RegionAllProps {
  REGION_URL: string;
  setRegionList: Dispatch<SetStateAction<RegionProps[]>>;
  setUserRegion: Dispatch<SetStateAction<number | undefined>>;
  setRegionId: Dispatch<SetStateAction<number | undefined>>;
  accessToken: string | null;
}

interface GetFindRoomProps {
  setBoardOneList: Dispatch<SetStateAction<Board[]>>;
  boardOneOffset: number;
  regionId?: number;
  lastPostId: number | null;
  setLastPostId: Dispatch<SetStateAction<null>>;
  accessToken: string | null;
  SERVER_BORDONE: string;
}

interface GetHasRoomProps {
  setBoardTwoList: Dispatch<SetStateAction<Board[]>>;
  boardTwoOffset: number;
  regionId?: number;
  lastPostId: number | null;
  setLastPostId: Dispatch<SetStateAction<null>>;
  accessToken: string | null;
  SERVER_BORDTWO: string;
}

//첫 화면 지역데이터 다 가져오기
export async function regionAll({
  REGION_URL,
  setRegionList,
  setUserRegion,
  setRegionId,
  accessToken,
}: RegionAllProps) {
  await axios
    .get(`${REGION_URL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      // console.log(response.data);
      setRegionList(response.data.regionMainDtoList);
      setUserRegion(response.data.regionId);
      setRegionId(response.data.regionId);
    })
    .catch((error) => {
      console.log(error);
    });
}

// "방구해요" 게시물 가져오기
export async function getFindRoomPostData({
  setBoardOneList,
  boardOneOffset,
  regionId,
  lastPostId,
  setLastPostId,
  accessToken,
  SERVER_BORDONE,
}: GetFindRoomProps) {
  if (regionId && boardOneOffset === 0) {
    await axios
      .get(`${SERVER_BORDONE}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          size: 5,
          lastPostId: null,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBoardOneList(response.data.postProjectionMainDtoList);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (regionId && lastPostId !== null) {
    await axios
      .get(`${SERVER_BORDONE}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          size: 5,
          lastPostId: lastPostId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        // console.log(lastPostId);
        setBoardOneList((prev) => [
          ...prev,
          ...response.data.postProjectionMainDtoList,
        ]);
        setLastPostId(response.data.lastPostId);
      })

      .catch((error) => {
        console.log(error);
      });
  }
}

//"방 있어요" 게시물 가져오기
export async function getHasRoomPostData({
  setBoardTwoList,
  boardTwoOffset,
  regionId,
  lastPostId,
  setLastPostId,
  accessToken,
  SERVER_BORDTWO,
}: GetHasRoomProps) {
  if (regionId && boardTwoOffset === 0) {
    await axios
      .get(`${SERVER_BORDTWO}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          size: 5,
          lastPostId: null,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBoardTwoList(response.data.postProjectionMainDtoList);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (regionId && lastPostId !== null) {
    await axios
      .get(`${SERVER_BORDTWO}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          size: 5,
          lastPostId: lastPostId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBoardTwoList((prev) => [
          ...prev,
          ...response.data.postProjectionMainDtoList,
        ]);
        setLastPostId(response.data.lastPostId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
