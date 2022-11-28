import React from "react";
import { getRandomInt } from "../config";
import MusicItem from "./MusicItem";

const MusicList = (props) => {
  const {
    list,
    selectMus = Function.prototype,
    addMusic = Function.prototype,
  } = props;

  return (
    <div className="container">
      <div className="row music-list">
        {list.length > 0 ? null : <h3>listen or like something</h3>}
        {list.map((el) => (
          <MusicItem
            el={el}
            key={
              el.url +
              new Date() +
              getRandomInt(1000) +
              `${getRandomInt(1000)}` +
              getRandomInt(1000) +
              `${getRandomInt(1000)}` +
              getRandomInt(1000) +
              `${getRandomInt(1000)}` +
              getRandomInt(1000) +
              `${getRandomInt(1000)}` +
              getRandomInt(1000) +
              `${getRandomInt(1000)}`
            }
            selectMus={selectMus}
            addMusic={addMusic}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicList;
