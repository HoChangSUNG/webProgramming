import { useRef, useState, useEffect } from "react";
import axios from "axios";



const TheaterInfoRow = ({theater,movieId}) => {
    const [timeInfo,setTimeInfo] = useState(false);
    useEffect(() => {
        const date = new Date();
        let movieTime = theater.time;
        const curTime = date.getHours()*100 + date.getMinutes();
        const hour = String(movieTime).substring(0,2);
        const min = String(movieTime).substring(2,4);

        let result={}
        result.available = movieTime>curTime?true:false;
        result.time = hour+":"+min;
        console.log(result);
        setTimeInfo(result);
      }, []);
      const moveToBookingFirstPage=()=>{ // 영화, 시간 선택 페이지로 이동
        window.location.replace(`/select/${movieId}/${theater.id}`);

      }
  return (
    timeInfo.available?
    <div className="theater_schedule_item_show_movie_theater_seat_info" onClick={moveToBookingFirstPage}><p className="theater_schedule_main_page_time">{timeInfo.time}</p><p className="theater_schedule_main_page_available_seat">{theater.curSeat}석</p></div>
    : <div className="theater_schedule_item_show_movie_theater_seat_info "><p className="theater_schedule_main_page_time closedTime">{timeInfo.time}</p><p className="theater_schedule_main_page_available_seat closedTime">마감</p></div>

  );
};
export default TheaterInfoRow;
