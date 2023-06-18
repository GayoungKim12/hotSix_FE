import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface RegionAllProps {
  REGION_URL: string;
  setRegionList: Dispatch<SetStateAction<string[]>>;
  setUserRegion: Dispatch<SetStateAction<number | undefined>>;
  setRegionId: Dispatch<SetStateAction<number | undefined>>;
}

interface GetFindRoomProps {
  setBoardOneList: Dispatch<SetStateAction<string[]>>;
  BORDONE_URL: string;
  boardOneOffset: number;
  regionId?: number;
}

interface GetHasRoomProps {
  setBoardTwoList: Dispatch<SetStateAction<string[]>>;
  BORDTWO_URL: string;
  boardTwoOffset: number;
  regionId?: number;
}

//첫 화면 지역데이터 다 가져오기
export async function regionAll({
  REGION_URL,
  setRegionList,
  setUserRegion,
  setRegionId,
}: RegionAllProps) {
  // createConfig("get", "main", null)
  //   .then((response) => {
  //     console.log(response.data.regionMainDtoList);
  //     setRegionList(response.data.regionMainDtoList);
  //   })
  //   .catch((error) => {
  //     console.log("에러");
  //     console.error(error);
  //   });
  await axios
    .get(`${REGION_URL}`)
    .then((response) => {
      setRegionList(response.data.regionMainDtoList);
      setUserRegion(response.data.region_id);
      setRegionId(response.data.region_id);
    })
    .catch((error) => {
      console.log(error);
    });
}

// "방구해요" 게시물 가져오기
export async function getFindRoomPostData({
  setBoardOneList,
  BORDONE_URL,
  boardOneOffset,
  regionId,
}: GetFindRoomProps) {
  if (regionId && boardOneOffset === 0) {
    await axios
      .get(`${BORDONE_URL}`, {
        params: { _start: 0, _limit: 5 },
      })
      .then((response) => {
        setBoardOneList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    await axios
      .get(`${BORDONE_URL}`, {
        params: { _start: boardOneOffset, _limit: 5 },
      })
      .then((response) => {
        setBoardOneList((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//"방 있어요" 게시물 가져오기
export async function getHasRoomPostData({
  setBoardTwoList,
  BORDTWO_URL,
  boardTwoOffset,
  regionId,
}: GetHasRoomProps) {
  if (regionId && boardTwoOffset === 0) {
    await axios
      .get(`${BORDTWO_URL}`, {
        params: { _start: 0, _limit: 5 },
      })
      .then((response) => {
        setBoardTwoList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    await axios
      .get(`${BORDTWO_URL}`, {
        params: { _start: boardTwoOffset, _limit: 5 },
      })
      .then((response) => {
        setBoardTwoList((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
