import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PersonCnt = ({element,selectCnt,setSelectCnt}) => {

   
  return (
    <div className={element==selectCnt?"seat-booking-content-header-person-count-item clcikedCnt":"seat-booking-content-header-person-count-item"} onClick={() => setSelectCnt(element)}>
    {element}
  </div>
);
};
export default PersonCnt;
