import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import { MUSIC_ADD_TIME, MUSIC_DB, MUSIC_STOP } from "./DB_music/MusicList_DB";
import MusicList from "./components/MusicList";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import { filterFuncID, filterFuncSTRING, findGA, getRandomInt } from "./config";
import reactLogo from './assets/react.svg'
import './App.css'

export default function App() {
    const [musicId, setMusicId] = useState(getRandomInt(MUSIC_DB.length));
    const [playing, setPlaying] = useState(false);
    const [addedMusic, setAddedMusic] = useState([]);
    const [filtereAddedMusic, setFiltereAddedMusic] = useState([]);

    const [recList, setRecList] = useState({
        author: [],
        genre: [],
    });
    const [filteredRecList, setFilteredRecList] = useState({
        author: [],
        genre: [],
    });

    const [genreRec, setGenreRec] = useState([]);
    const [authorRec, setAuthorRec] = useState([]);

    //ГОЛОВНАЯ БОЛЬ
    const recomAudio = (musID) => {
        const audioauthor = MUSIC_DB[musID].author;
        const audioGenre = MUSIC_DB[musID].genre;

        const audioListNotFiltered = [...recList.author, ...audioauthor];
        const genreListNotFiltered = [...recList.genre, ...audioGenre];
        setRecList({
            author: [...audioListNotFiltered, ...recList.author],
            genre: [...genreListNotFiltered, ...recList.genre],
        });
    };

    const [timer, setTimer] = useState(0);
    const [examination, setExamination] = useState(false);

    //воспроизвести музыку
    const handleSelectMusic = (id) => {
        setMusicId(id);
        setExamination(true);
        setPlaying(MUSIC_STOP);
    };

    const handleAddMusic = (mus) => {
        recomAudio(mus.id);
        setAddedMusic([...addedMusic, mus]);
    };

    //отфильтровать музыку
    useEffect(() => {
        setFiltereAddedMusic(filterFuncID(addedMusic));
    }, [addedMusic]);

    //таймер
    useEffect(() => {
        if (examination) {
            if (timer > 0) {
                setTimer(0);
            }
            const interval = setInterval(() => {
                setTimer((prevStater) => prevStater + 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [musicId]);

    //проверка количества времени
    useEffect(() => {
        if (examination) {
            if (timer > MUSIC_ADD_TIME) {
                setExamination(false);
                recomAudio(musicId);
            }
        }
    }, [timer]);

    //отфильтровать автора и жанра
    useEffect(() => {
        setFilteredRecList({
            author: filterFuncSTRING(recList.author),
            genre: filterFuncSTRING(recList.genre),
        });
    }, [recList.author, recList.genre]);

    //реки
    useEffect(() => {
        setAuthorRec(filterFuncID(findGA(filteredRecList.author, "author")));
        setGenreRec(filterFuncID(findGA(filteredRecList.genre, "genre")));
    }, [filteredRecList.author, filteredRecList.genre]);

    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    {filteredRecList.author + " "}
                    <br />
                    {filteredRecList.genre + " "}
                    <br />
                    {timer}
                    <Routes>
                        <Route
                            index
                            path="/"
                            element={
                                <MusicList
                                    list={MUSIC_DB}
                                    selectMus={handleSelectMusic}
                                    addMusic={handleAddMusic}
                                />
                            }
                        />
                        <Route
                            path="added"
                            element={
                                <MusicList
                                    list={filtereAddedMusic}
                                    selectMus={handleSelectMusic}
                                    addMusic={handleAddMusic}
                                />
                            }
                        />
                        <Route
                            path="genre"
                            element={
                                <MusicList
                                    list={genreRec}
                                    selectMus={handleSelectMusic}
                                    addMusic={handleAddMusic}
                                />
                            }
                        />
                        <Route
                            path="author"
                            element={
                                <MusicList
                                    list={authorRec}
                                    selectMus={handleSelectMusic}
                                    addMusic={handleAddMusic}
                                />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                    <ReactPlayer
                        className="player"
                        playing={playing}
                        url={MUSIC_DB[musicId].url}
                        height="150px"
                        width="100vw"
                    />
                </div>
            </BrowserRouter>
        </>
    );
}
