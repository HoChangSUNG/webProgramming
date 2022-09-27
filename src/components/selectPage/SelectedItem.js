import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";

const SelectedItem = ({ selectedMovieInfo, movieId, theaterId }) => {
    const moveToSeatBookingPage=()=>{ //현민이한테 넘겨줄것
        window.location.href=`/seatbook/${theaterId}`;
    }
  const [selectedMovieshow, setSelectedMovieshow] = useState(false);
  const [selectedTheatershow, setSelectedTheatershow] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/movies/" + movieId, { withCredentials: true })
      .then((res) => {
        setSelectedMovieshow(res.data);
        setSelectedTheatershow(false);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  useEffect(() => {
    console.log(theaterId);
    if (theaterId) {
      axios
        .get("http://localhost:8080/theater/" + movieId, {
          withCredentials: true,
        })
        .then((res) => {
          const theaterResult = res.data.result;
          setSelectedTheatershow(
            theaterResult.filter((v) => v.id == theaterId)[0]
          );
        })
        .catch((err) => console.log(err));
    }
  }, [theaterId]);

  return selectedMovieshow ? (
    <div className="selected_check_show_content_wrapper">
      <div className="selected_check_show_content_img">
        <img
          className="selected_check_show_content_img_content"
          src={selectedMovieshow.imgSrc}
        ></img>
      </div>
      <div className="selected_check_show_content_movie_info">
        <p>{selectedMovieshow.movieName}</p>
        <p>2D</p>
        <p>{selectedMovieshow.ageLimit}세 관람가</p>
      </div>
      {selectedTheatershow ? (
        <div className="selected_check_show_content_theater_info">
          <div className="selected_check_show_content_real_theater">
            극장 <span>CGV 구미</span>
          </div>
          <div className="selected_check_show_content_theater_position">
            상영관
            <span>
              {selectedTheatershow.number}관 {selectedTheatershow.number}층
            </span>
          </div>
        </div>
      ) : (
        <div className="selected_check_show_content_theater_info"></div>
      )}
      {theaterId?(
      <div className="next-seat-choice-button-div clickable_available" onClick={moveToSeatBookingPage}>
        <AiOutlineArrowRight className="ai_outline_arrow_right_booking_btn"></AiOutlineArrowRight>
        <p>좌석선택</p>
      </div>):<div className="next-seat-choice-button-div" >
        <AiOutlineArrowRight className="ai_outline_arrow_right_booking_btn "></AiOutlineArrowRight>
        <p>좌석선택</p>
      </div>}
    </div>
  ) : (
    <div></div>
  );
};
export default SelectedItem;
