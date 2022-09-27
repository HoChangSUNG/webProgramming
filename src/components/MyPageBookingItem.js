import { useRef, useState, useEffect } from "react";
import axios from "axios";


const MyPageBookingItem = ({booking}) => {
    const [timeInfo,setTimeInfo]= useState(false);
    useEffect(() => {
 
        const hour = String(booking.time).substring(0, 2);
        const min = String(booking.time).substring(2, 4);

        setTimeInfo( hour + ":" + min);
      }, [booking]);
    
      const bookingCancel = ()=>{

        axios
        .post("http://localhost:8080/booking/delete/"+booking.id,{ withCredentials: true })
        .then((res) => {
            alert("예매 취소 성공");
            window.location.href=`/myPage`;

        })
        .catch((err) => console.log(err));

      }

  return  (
    <div className="booking-info-item">
    <div className="booking-info-item-img-wrap">
      <img
        src={booking.imgSrc}
        className="booking-info-item-img"
      ></img>
      <p className="booking-info-item-movieName">{booking.movieName}</p>
      <p className="booking-info-item-theater">{booking.theaterNum}층 {booking.theaterNum}관</p>
      <p className="booking-info-item-seat-position">{booking.seatPosition}</p>
      <p className="booking-info-item-time">{timeInfo}</p>
      <div className="movie_cancel_button_click" onClick={bookingCancel}>예매취소</div>

    </div>
  </div>
  );
};

export default MyPageBookingItem;
