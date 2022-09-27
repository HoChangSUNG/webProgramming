import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SeatRow from "./SeatRow";
import PersonCnt from "./PersonCnt";
import { AiOutlineArrowRight } from "react-icons/ai";

const SeatMainPage = () => {
  const [selectCnt, setSelectCnt] = useState(false); // 인원수
  const [seatArr, setSeatArr] = useState(false); //좌석 현황
  const [availableCnt, setAvailableCnt] = useState(false); //현재 가능 좌석 개수
  const [theaterInfo, setTheaterInfo] = useState(false); //상영관 정보
  const [booked, setBooked] = useState(false); //이미 예매된 좌석
  const [clicked, setClicked] = useState([]);
  const [bookAvailable, setBookAvailable] = useState(false);
  const { theaterId } = useParams();

  const bookingTicket = () => {


    clicked.map((id)=>{
      axios
      .post(
          "http://localhost:8080/booking/ticketing",
        {
          "id": id
        },
        { withCredentials: true }
      )
      .then((res) => {
          console.log(res.data);
      // window.location.replace("/movies/" + props.movieId)
  
      }).catch((err) => console.log(err));
    })
    alert("예매 성공");
      window.location.replace("/myPage");

  };
  useEffect(() => {
    if (selectCnt == clicked.length && selectCnt) {
      setBookAvailable(true);
    } else {
      setBookAvailable(false);
    }
  }, [clicked]);
  useEffect(() => {
    if (selectCnt == clicked.length && selectCnt) {
      setBookAvailable(true);
    } else {
      setBookAvailable(false);
    }
  }, [selectCnt]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/seat/" + theaterId, { withCredentials: true })
      .then((res) => {
        if(res.data.isLogin){
          setSeatArr(res.data.seat);
          setAvailableCnt(res.data.curCount);
          setTheaterInfo(res.data.theater);
          setBooked(res.data.booked);
        }
        else{
          alert("로그인이 필요한 서비스입니다");
          window.location.href=`/login`;

        }
      })
      .catch((err) => console.log(err));
  }, []);

  return seatArr && availableCnt && theaterInfo && booked ? (
    <div className="seat-booking-contatiner">
      <div className="seat-booking-content">
        <div className="seat-booking-content-header">
          <div className="seat-booking-content-header-person-count">
            <div className="seat-booking-content-header-person-count-title">
              일반
            </div>
            <div className="seat-booking-content-header-person-count-itemWrap">
              {[1, 2, 3, 4].map((element, index) => (
                <PersonCnt
                  element={element}
                  selectCnt={selectCnt}
                  setSelectCnt={setSelectCnt}
                  key={index}
                ></PersonCnt>
              ))}
            </div>
          </div>
          <div className="seat-booking-content-header-theater-info">
            <div>CGV 구미</div>
            <div>
              {theaterInfo.number}관 {theaterInfo.number}층
            </div>
            <div>
              남은 좌석 <span>{availableCnt}</span>/{theaterInfo.totalSeat}
            </div>
          </div>
        </div>
        <div className="seat_numbering">
          <div className="seat_numbering_screen">screen</div>
          <div className="seat_wrapper_class">
            {seatArr.map((rowInfo, index) => (
              <SeatRow
                row={rowInfo}
                key={index}
                clicked={clicked}
                setClicked={setClicked}
                booked={booked}
              ></SeatRow>
            ))}
          </div>
        </div>

        {bookAvailable ? (
          <div
            className="next-seat-choice-button-div clickable_available btnPostionNew"
            onClick={bookingTicket}
          >
            <AiOutlineArrowRight className="ai_outline_arrow_right_booking_btn"></AiOutlineArrowRight>
            <p>예매</p>
          </div>
        ) : (
          <div className="next-seat-choice-button-div btnPostionNew">
            <AiOutlineArrowRight className="ai_outline_arrow_right_booking_btn "></AiOutlineArrowRight>
            <p>예매</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default SeatMainPage;
