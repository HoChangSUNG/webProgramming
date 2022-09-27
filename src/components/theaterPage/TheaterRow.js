import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import TheaterInfoRow from "./TheaterInfoRow";

const TheaterRow = ({movie}) => {


  return (
    <div className="theater_schedule_item">
    <div className="theater_schedule_item_first_wrapper">
        
        <div className={"theater_schedule_item_age_limit"+ (movie.limit=='전체'?" ageAlLimit_color":(movie.limit=='12'?" age12Limit_color":" age15Limit_color") )}>
        {movie.limit}
        </div>
        <div className="theater_schedule_item_show_movie_name">
        {movie.movieName}
        </div> 
        <div className="theater_schedule_item_show_movie_sub_info"> {movie.genre}/{movie.showTime}분/<Moment format='YYYY.MM.DD'>{movie.openDate}</Moment>  개봉</div>
    </div>
    <div className="theater_schedule_item_second_wrapper">
        <div className="theater_schedule_item_show_movie_theater_info"> ▶ 2D | {movie.theaters[0].number}관 {movie.theaters[0].number}층 | 총 {movie.theaters[0].totalSeat}석</div>
    </div>
    <div className="theater_schedule_item_third_wrapper">
            {movie.theaters.map((theater, index) => (
        <TheaterInfoRow theater={theater} key={index} movieId={movie.movieId}></TheaterInfoRow>
              ))}
    </div >
</div>
  );
};
export default TheaterRow;
