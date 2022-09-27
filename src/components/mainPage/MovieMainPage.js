import { useRef, useState, useEffect } from "react";
import axios from "axios";
import MovieCarouselDetail from "./MovieCarouselDetail";
import MovieEventDetail from "./MovieEventDetail";

//movieRating :평점
//bookingRate : 예매율
//showTime : 상영 시간
//openDate : 개봉 날짜

const movieEvent = [
  {
    eventTitle: "[CGV NFT 플레이 포스터] No.2 범죄도시2",
    imgSrc:
      "https://img.cgv.co.kr/WebApp/contents/eventV4/34501/16521431715560.jpg",
    eventDuring: "2022.05.10~2022.06.12",
  },
  {
    eventTitle: "[쥬라기 월드: 도미니언]CGV 필름마크",
    imgSrc:
      "https://img.cgv.co.kr/WebApp/contents/eventV4/34608/16534549224840.jpg",
    eventDuring: "2022.05.25~2022.06.19",
  },
  {
    eventTitle: "[범죄도시2] 포토플레이 시크릿 컷",
    imgSrc:
      "https://img.cgv.co.kr/WebApp/contents/eventV4/34521/16521429577520.jpg",
    eventDuring: "2022.05.10~2022.06.05",
  },
  {
    eventTitle: "[범죄도시2]CGV 필름마크",
    imgSrc:
      "https://img.cgv.co.kr/WebApp/contents/eventV4/34541/16522354176350.jpg",
    eventDuring: "2022.05.11~2022.06.05",
  },
];

const MovieMainPage = () => {
  const movieCnt = 4;
  const [curMovies, setCurMovies] = useState(false);
  const curIndex = useRef(0);
  let movieDetail = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/movies?criteria=bookingRate")
      .then((res) => {
        movieDetail.current = res.data;
        setCurMovies(movieDetail.current.slice(0, movieCnt));

      })
      .catch((err) => console.log(err));
  }, []);

  // movie-detail-carousel

  //movie-event-carousel
  const [curEventIndex, setCurEventIndex] = useState(0);
  const secondMovieEvent = movieEvent
    .slice(2, 4)
    .concat(...movieEvent.slice(0, 2));
  const curMovieEventList = [[...movieEvent], [...secondMovieEvent]];

  // movie-detail-carousel
  const moveSlide = (e) => {
    if (e.target.className === "swiper-button-prev") {
      curIndex.current = curIndex.current === 0 ? 1 : 0;
    } else if (e.target.className === "swiper-button-next") {
      curIndex.current = curIndex.current === 1 ? 0 : 1;
    }

    const start = curIndex.current * movieCnt;
    const end = curIndex.current * movieCnt + movieCnt;

    setCurMovies(movieDetail.current.slice(start, end));
  };

  //movie-event-carousel ->Timer 무한 반복
  useEffect(() => {
    const timer = setInterval(
      () => setCurEventIndex((curEventIndex + 1) % 2),
      3000
    );
    return () => clearInterval(timer);
  }, [curEventIndex]);

  return (
    curMovies?
    <div>
      {/* 영화 랭킹 */}
      <div className="movie_carousel_container">
        <div className="movie_carousel_name_wrap">무비 차트</div>
        <div className="movie_carousel_wrapper">
          <div className="movie_carousel_button_wrapper">
            <img className="swiper-button-prev" onClick={moveSlide}></img>

            <div className="movie_carousel_contents">
              {curMovies.map((movie, index) => (
                <MovieCarouselDetail
                  posterDetail={movie}
                  key={index}
                  rank={curIndex.current * movieCnt + index + 1}
                ></MovieCarouselDetail>
              ))}
            </div>

            <img className="swiper-button-next" onClick={moveSlide}></img>
          </div>
        </div>
      </div>

      {/* 이벤트 목록 */}
      <div className="movie_event_container">
        <div className="movie_event_name_wrap">EVENT</div>
        <div className="movie_event_contents">
          {curMovieEventList[curEventIndex].map((movieEvent, index) => (
            <MovieEventDetail
              eventDetail={movieEvent}
              key={index}
            ></MovieEventDetail>
          ))}
        </div>
      </div>
      <div></div>
    </div>:<div></div>
  );
};
export default MovieMainPage;
