const MusicItem = (props) => {
  const {
    el,
    selectMus = Function.prototype,
    addMusic = Function.prototype,
  } = props;

  return (
    <>
      <div className="col s3 music-box">
        <p>
          {el.author} - {el.name}
        </p>
        <p>{el.genre}</p>
        <div className="bottom-button">
          <div
            className="btn  btn-small red"
            onClick={() => {
              selectMus(el.id);
            }}
          >
            <i className="material-icons">play_arrow</i>
          </div>
          <div
            className="btn btn-floating btn-small red"
            onClick={() => {
              addMusic(el);
            }}
          >
            <i className="material-icons">add</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicItem;
