import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import MovieMainPage from "./components/mainPage/MovieMainPage";
import react, { useState, useRef } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import MovieListPage from "./components/listPage/MovieListPage";
import LoginPage from "./components/LoginPage";
import MovieDetailPage from "./components/detailPage/MovieDetailPage";
import SignUpPage from "./components/SignUpPage";
import MyPage from "./components/MyPage";
import TheaterMainPage from "./components/theaterPage/TheaterMainPage";
import SelectMainPage from "./components/selectPage/SelectMainPage";
import SeatMainPage from "./components/seatPage/SeatMainPage";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route
          path="/" //메인 페이지(mainPage)
          element={<MovieMainPage></MovieMainPage>}
        ></Route>
        <Route
          path="/movies" //영화 리스트 페이지(listPage)
          element={<MovieListPage></MovieListPage>}
        ></Route>
        <Route
          path="/login" //로그인 페이지
          element={<LoginPage></LoginPage>}
        ></Route>
        <Route
          path="/movies/:id" // 영화 상세 정보 페이지(detailPage)
          element={<MovieDetailPage></MovieDetailPage>}
        ></Route>
        <Route
          path="/signUp" //회원가입
          element={<SignUpPage></SignUpPage>}
        ></Route>
        <Route
          path="/myPage" //MyPage
          element={<MyPage></MyPage>}
        ></Route>
        <Route
          path="/theater" //극장
          element={<TheaterMainPage></TheaterMainPage>}
        ></Route>
        <Route
          path="/select/:movieId/:theaterId" //예매
          element={<SelectMainPage></SelectMainPage>}
        ></Route>
                <Route
          path="/seatbook/:theaterId" //예매
          element={<SeatMainPage></SeatMainPage>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
