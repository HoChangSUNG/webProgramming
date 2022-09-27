import axios from "axios";
import { useRef, useState, useEffect } from "react";
import MyPageBookingItem from "./MyPageBookingItem";

const MyPage = () => {
  const [userInfo,setUserInfo] = useState(false);
  const [bookings,setBookings] = useState(false);

  useEffect(() => {
    // 페이지 로딩되자마자 정보 불러옴
    axios
      .get("http://localhost:8080/booking/list",{ withCredentials: true })
      .then((res) => {
        if(res.data.isLogin){
          console.log(res);
          setUserInfo(res.data.user);
          setBookings(res.data.booking);
        }
          else{
            alert("로그인 이후 이용 가능합니다.");
            window.location.href=`/login`;
          }
      })
      .catch((err) => console.log(err));
  }, []);

  return userInfo&&bookings?(
    <div>
      <div className="signUp-page-container">
        <div className="signUp-page-content">
          <div className="sect_person_info">
            <div className="sect-person-div">
              <img
                className="sect-person-img"
                src="/img/logo/big_profile.png"
              ></img>
            </div>
            <div className="mypage-sect-personal-info">
             
              <span className="mypage-person-name">{userInfo.username}님</span>
              <span className="mypage-person-id">{userInfo.userId}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="booking-page-container">
        <div className="booking-page-content">
          <div className="booking-info-content">
            <h1>My 예매내역</h1>

            <div className="booking-info-content-border">
            {bookings.map((booking, index) => (
                  <MyPageBookingItem
                  booking={booking}
                    key={index}
                  ></MyPageBookingItem>
       
                ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  ):(<div></div>);
};
export default MyPage;
