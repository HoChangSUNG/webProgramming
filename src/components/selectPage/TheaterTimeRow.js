import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";

const TheaterTimeRow = ({
  theather,
  selectTheaterId,
  setSelected,
  keyIndex,
}) => {
  const [timeInfo, setTimeInfo] = useState(false);
  useEffect(() => {
    const date = new Date();
    let movieTime = theather.time;
    const curTime = date.getHours() * 100 + date.getMinutes();
    const hour = String(movieTime).substring(0, 2);
    const min = String(movieTime).substring(2, 4);

    let result = {};
    result.available = movieTime > curTime ? true : false;
    result.time = hour + ":" + min;
    setTimeInfo(result);
  }, [theather]);

  return timeInfo.available ? (
    <div className="tikect_selection_movie_select_theater_info_item">
      <div
        className={
          selectTheaterId == theather.id
            ? "tikect_selection_movie_select_theater_info_item_time tikect_selection_box_clicked tikect_selection_box_clicked_font_color"
            : "tikect_selection_movie_select_theater_info_item_time"
        }
        onClick={() => setSelected(theather.id)}
      >
        {timeInfo.time}
      </div>
      <div className="tikect_selection_movie_select_theater_info_item_available_seat_num">
        {theather.curSeat}석
      </div>
    </div>
  ) : (
    <div className="tikect_selection_movie_select_theater_info_item">
      <div
        className={
          "tikect_selection_movie_select_theater_info_item_time closedTime"
        }
      >
        {timeInfo.time}
      </div>
      <div className="tikect_selection_movie_select_theater_info_item_available_seat_num tikect_selection_box_clicked_font_color_closed_">
        예매종료
      </div>
    </div>
  );
};
export default TheaterTimeRow;
