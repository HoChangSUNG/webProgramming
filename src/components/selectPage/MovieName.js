import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";

const MovieName = ({ movie, selectedMovieId, setSelected, keyIndex }) => {
  return (
    <div
      className={
        movie.movieId == selectedMovieId
          ? "tikect_selection_movie_select_movie_movies_item tikect_selection_box_clicked"
          : "tikect_selection_movie_select_movie_movies_item"
      }
      onClick={() => setSelected(movie.movieId)}
    >
      <div
        className={
          "tikect_selection_movie_select_movie_movies_limit_age" +
          (movie.limit == "전체"
            ? " ageAlLimit_color"
            : movie.limit == "12"
            ? " age12Limit_color"
            : " age15Limit_color")
        }
      >
        {movie.limit}
      </div>
      <div
        className={
          movie.movieId == selectedMovieId
            ? "tikect_selection_movie_select_movie_movies_movie_name tikect_selection_box_clicked_font_color"
            : "tikect_selection_movie_select_movie_movies_movie_name"
        }
      >
        {movie.movieName}
      </div>
    </div>
  );
};
export default MovieName;
