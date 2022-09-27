import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SeatItem from "./SeatItem";

const SeatRow = ({row,clicked,setClicked,booked}) => {

  
  return (
    <div className="seat_wrapper_row">
        <div className="row_alphabet">{row[0].row}</div>
        <div  className="row_item_wrap">
        {row.map((item, index) => (
              <SeatItem
                item={item}
                key={index}
                a={index} 
                clicked={clicked}
                setClicked={setClicked}
                booked={booked}
              ></SeatItem>
            ))}
            {/* <div className="row_item">2</div>
            <div className="row_item">1</div>
            <div className="row_item">1</div>
            <div className="row_item">1</div>
            <div className="row_item">1</div> */}
        </div>
    </div>);
};
export default SeatRow;
