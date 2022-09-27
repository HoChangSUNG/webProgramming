import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeatItem = ({item,clicked,setClicked,a,booked}) => {
    const [isChecked,setIsChecked] = useState(false);
    const [isBooked,setIsBooked] = useState(false);

    useEffect(() => {
        let curState = [...clicked];
        console.log();
        curState.indexOf(item.id)!=-1?setIsChecked(true):setIsChecked(false)
      }, [clicked]);

      useEffect(() => {
        let curState = [...booked];
        curState.indexOf(item.id)!=-1?setIsBooked(true):setIsBooked(false);

      }, []);

    const setClcikedState=()=>{
        let curState = [...clicked];

        curState.indexOf(item.id)==-1?setIsChecked(true):setIsChecked(false)
        const position = curState.indexOf(item.id);
        if(position==-1){
            curState.push(item.id);
            setClicked(curState);
        }
        else{
            curState.splice(position,1);
            setClicked(curState);
        }
    }
  
  return (
    isBooked?<div className="row_item alreadyBooked" >{a+1}</div>:
            <div className={isChecked?"row_item clickedSeat":"row_item"} onClick={setClcikedState}>{a+1}</div>
);
};
export default SeatItem;
