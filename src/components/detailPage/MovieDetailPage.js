import { AiOutlineLike } from "react-icons/ai";
import classnames from "classnames";
import { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import CommentPage from "./CommentPage";

const sendCreateComment = (movieId, commentContent, commentRate) => {
  axios
    .post(
      "http://localhost:8080/comments/",
      {
        content: commentContent,
        rate: commentRate,
        movieId: movieId,
      },
      { withCredentials: true }
    )
    .then((res) => {
      alert("등록 성공");
      window.location.replace("/movies/" + movieId);
    });
};

const MovieDetailPage = (props) => {
  const { id } = useParams(); //영화 id pathvariable

  const [movieInfo, setMovieInfo] = useState(false);
  const [loginInfo, setLoginInfo] = useState(false);
  const [commentInfo, setCommentInfo] = useState(false);

  const showCommentDiv = () => {
    //댓글 등록 div 보여주기
    //코멘트 등록 div 보이기/숨기기
    if (loginInfo.login) {
      // 로그인 되어 있을 때
      document
        .querySelector("#create_comment_wrap_div")
        .classList.toggle("offCommentWriteActive");
    } else {
      // 로그인 되어 있지 않을 때
      alert("로그인 후 이용 가능합니다.");
    }
  };

  const create_comment_func = () => {
    // 댓글 저장
    const input_content = document.querySelector(
      "#create_comment_content"
    ).value; //댓글 내용
    const rate = document.querySelector("#comment-rating").value; //댓글 평점
    sendCreateComment(id, input_content, rate);
  };

  useEffect(() => {
    // 영화 상세 정보 가져오기
    axios
      .get("http://localhost:8080/movies/" + id, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setMovieInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // 로그인 여부 확인하기.
    axios
      .get("http://localhost:8080/users/login", { withCredentials: true })
      .then((res) => {
        setLoginInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // 댓글 정보 가져오기
    axios
      .get("http://localhost:8080/comments/" + id, { withCredentials: true })
      .then((res) => {
        setCommentInfo(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return movieInfo ? (
    <div>
      <div className="movie-detail-container">
        <div className="movie-detail-contents">
          <div className="movie-detail-poster-img">
            <img src={movieInfo.imgSrc}></img>
          </div>
          <div className="movie-detail-info-wrap">
            <strong className="movie-dtail-info-title">
              {movieInfo.movieName}
            </strong>
            <div className="movie-dtail-info-booking-rank">
              예매율 {movieInfo.bookingRate}% | 평점 {movieInfo.movieRate}%
            </div>
            <div className="movie-dtail-info-persons">
              감독 : {movieInfo.director} / 배우 : {movieInfo.actor}
            </div>
            <div className="movie-dtail-info-otherInfo">
              장르 : {movieInfo.genre} / 기본 :{" "}
              {movieInfo.ageLimit == "전체"
                ? movieInfo.ageLimit
                : movieInfo.ageLimit + "세 이상"}
              , {movieInfo.showTime}분, {movieInfo.country}
            </div>
            <div className="movie-dtail-info-openDate">
              개봉 : <Moment format="YYYY.MM.DD">{movieInfo.openDate}</Moment>
            </div>
            <div className="movie-dtail-info-to-booking">예매하기</div>
          </div>
        </div>
        <div className="wrap-persongrade">
          <div className="real-rating">
            <p className="title">
              관람일 포함 7일 이내 관람평을 남기시면 <strong>CJ ONE 20P</strong>
              가 적립됩니다.
            </p>
            <p className="comment-title-desc">
            </p>
            <div className="wrap_btn">
              <a
                className="link-gradewrite"
                id="show-comment-div"
                onClick={showCommentDiv}
              >
                <span>평점작성</span>
              </a>
              <a className="link-reviewwrite">
                <span>내 평점</span>
              </a>
            </div>
          </div>

          {/* 댓글 등록 화면 */}
          <div
            className={classnames(
              "create_comment_wrap",
              "offCommentWriteActive"
            )}
            id="create_comment_wrap_div"
          >
            <select
              className="comment-rating-select-option"
              id="comment-rating"
              name="comment-rating-type"
            >
              <option title="현재 선택됨" value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>

              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              className="comment-input-box"
              type="text"
              name="comment"
              id="create_comment_content"
            ></input>
            <div
              className="comment-submit"
              id="create_comment"
              onClick={create_comment_func}
            >
              등록
            </div>
          </div>

          {/*댓글*/}
          {commentInfo ? (
            <ul id="movie_point_list_container" className="movie_persongrade">
              {commentInfo.map((comment, index) => (
                <CommentPage commentInfo={comment} key={index} keyIndex={index} movieId={id}></CommentPage>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default MovieDetailPage;
