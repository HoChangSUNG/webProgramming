import MovieListDetail from "./MovieListDetail";
import { useRef, useState, useEffect } from "react";
import axios from "axios";


const MovieListPage = () => {
  const [movieDetail, setMovieDetail] = useState(false);

  useEffect(() => {// 화면 처음 로딩될때
    axios
      .get("http://localhost:8080/movies?criteria=bookingRate")
      .then((res) => {
        setMovieDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getMovieList = (e) => {// go버튼 눌렀을 때
    const criteria = document.querySelector("#order_type").value;
    axios
      .get(
        `http://localhost:8080/movies?criteria=${criteria}`,
      )
      .then((res) => {
        console.log(res.data);
        setMovieDetail(res.data);
      });
  };

  return movieDetail ? (
    <div className="movie_list_container">
      <div className="tit-movie-list-heading-wrap">
        <h3>무비차트</h3>
      </div>
      <div className="movielist-sect-sorting">
        <select
          className="movie-select-option"
          id="order_type"
          name="order-type"
        >
          <option title="현재 선택됨" value="bookingRate">
            예매율순
          </option>
          <option value="movieRate">평점순</option>
        </select>
        <button type="button" className="sorting-button" onClick={getMovieList}>
          <span>GO</span>
        </button>
      </div>
      <div className="movie_list_contents">
        {movieDetail.map((movie, index) => (
          <MovieListDetail
            movieInfo={movie}
            key={index}
            rank={index + 1}
          ></MovieListDetail>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default MovieListPage;
