import { MUSIC_DB } from "./DB_music/MusicList_DB";

//отфильтровать массив и вернуть отфильтрованное
export const filterFuncID = (arr) => {
  const filtered = [];
  arr.filter((item) => {
    if (!filtered.some((element) => element.id === item.id)) {
      filtered.push(item);
    }
  });
  return filtered;
};

export const filterFuncSTRING = (arr) => {
  return Array.from(new Set(arr));
};

export const findGA = (arrG, type) => {
  const findARR = [];
  if (type == "genre") {
    for (let i = 0; i < arrG.length; i++) {
      for (let j = 0; j < MUSIC_DB.length; j++) {
        if (MUSIC_DB[j].genre.includes(arrG[i])) {
          findARR[findARR.length] = MUSIC_DB[j].id;
        }
      }
    }
  } else if (type == "author") {
    for (let i = 0; i < arrG.length; i++) {
      for (let j = 0; j < MUSIC_DB.length; j++) {
        if (MUSIC_DB[j].author.includes(arrG[i])) {
          findARR[findARR.length] = MUSIC_DB[j].id;
        }
      }
    }
  }
  return addArrMusic(findARR);
};

export const addArrMusic = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) newArr[newArr.length] = MUSIC_DB[arr[i]];
  return newArr;
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
