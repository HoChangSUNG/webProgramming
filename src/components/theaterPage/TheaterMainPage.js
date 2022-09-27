import { useRef, useState, useEffect } from "react";
import axios from "axios";
import TheaterRow from "./TheaterRow";

const TheaterMainPage = () => {
  const [theaters, setTheaters] = useState(false);

  useEffect(() => {
    // 페이지 로딩되자마자 정보 불러옴
    axios
      .get("http://localhost:8080/theater/test/not")
      .then((res) => {
        setTheaters(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return theaters ? (
    <div className="theater_schedule_container">
      <div className="theater_schedule_wrapper">
        {theaters.map((theater, index) => (
          <TheaterRow movie={theater} key={index}></TheaterRow>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default TheaterMainPage;
