import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useParams } from "react-router-dom";
import MovieName from "./MovieName";
import TheaterTimeRow from "./TheaterTimeRow";
import SelectedItem from "./SelectedItem";

const SelectMainPage = () => {
  const { movieId, theaterId } = useParams(); //영화 id pathvariable
  const [movieAndTheaterInfo, setMovieAndTheaterInfo] = useState(false);
  const [theaterInfo, setTheaterInfo] = useState(false);
  const [selectMovieId, setSelectMovieId] = useState(movieId);
  const [selectTheaterId, setSelectTheaterId] = useState(theaterId);
  const isFirst = useRef(0);

  useEffect(() => {
    // 페이지 로딩되자마자 정보 불러옴
    axios
      .get("http://localhost:8080/theater/",{ withCredentials: true })
      .then((res) => {
        const isLogin =res.data.isLogin;
        if(isLogin){
          setMovieAndTheaterInfo(res.data.result);
        }
        else{
          alert("로그인이 필요한 서비스입니다.");
          window.location.href=`/login`;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // selectMovieId 바뀔때
    axios
      .get("http://localhost:8080/theater/" + selectMovieId)
      .then((res) => {
        setTheaterInfo(res.data.result);
      })
      .catch((err) => console.log(err));
    if (isFirst.current == 0) {
      isFirst.current += 1;
    } else {
      setSelectTheaterId(false);
    }
  }, [selectMovieId]);

  return movieAndTheaterInfo && selectMovieId ? (
    <div className="tikect_selection_movie_container">
      <div className="tikect_selection_movie_wrapper">
        <div className="tikect_selection_movie_select_movie_container">
          <div className="tikect_selection_movie_select_movie_title_header">
            영화
          </div>
          <div className="tikect_selection_movie_select_movie_movies_container">
            {/* 영화 제목 item 컴포넌트 들어가는 부분1 */}

            {movieAndTheaterInfo.map((movie, index) => (
              <MovieName
                movie={movie}
                key={index}
                selectedMovieId={selectMovieId}
                setSelected={setSelectMovieId}
                keyIndex={index}
              ></MovieName>
            ))}
          </div>
        </div>
        <div className="tikect_selection_movie_select_theater_time_container">
          <div className="tikect_selection_movie_select_theater_title_header">
            시간
          </div>
          {theaterInfo ? (
            <div className="tikect_selection_movie_select_theater_info_container">
              <div className="tikect_selection_movie_select_theater_info_theater_name">
                <span>2D</span>
                <span>{theaterInfo[0].number}관</span>
                <span>(총{theaterInfo[0].totalSeat}석)</span>
              </div>
              <div className="tikect_selection_movie_select_theater_info_item_wrapper">
                {theaterInfo.map((theater, index) => (
                  <TheaterTimeRow
                    theather={theater}
                    key={index}
                    selectTheaterId={selectTheaterId}
                    setSelected={setSelectTheaterId}
                    keyIndex={index}
                  ></TheaterTimeRow>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* 맨 아래 검은색 부분 */}
      <div className="selected_check_show_container">
        {movieAndTheaterInfo
          .filter((content) => movieId == content.movieId)
          .map((selectedMovieInfo, index) => (
            <SelectedItem
              key={index}
              selectedMovieInfo={selectedMovieInfo}
              movieId={selectMovieId}
              theaterId={selectTheaterId}
            ></SelectedItem>
          ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default SelectMainPage;
