import classnames from 'classnames';
import Moment from 'react-moment';

const MovieListDetail = (props) => {
    const valid = (props.rank<=3) ? true:false; // 3위 안에 들면 true
    
    return (
        <div className="movie_list_item">
            <div className="movie_list_item_wrap">
              <strong className={classnames("movie_list_item_rank",{movie_list_item_rank_top_3_color:valid})}>No.{props.rank}</strong> 
              {/* 3위 안에 들면 색깔 빨간색으로 변경(movie_list_item_rank_top_3_color 클래스 추가) */}
              <a href={"/movies/"+props.movieInfo._id}> {/*넘어갈 url 써주세요*/ }
              <img src={props.movieInfo.imgSrc}></img>
              </a>
  
            </div>
            <div className="movie_list_item_info">
              <div className="movie_list_item_name">{props.movieInfo.movieName}</div>
              <div className="movie_list_item_score">예매율{'\u00A0'}{'\u00A0'}{props.movieInfo.bookingRate}% | 평점 : {props.movieInfo.movieRate} %</div>
              {/* {'\u00A0'} -> 띄어쓰기 */}
              <div className="movie_list_item_open"><Moment format='YYYY.MM.DD'>{props.movieInfo.openDate}</Moment> 개봉</div>
              <span className="movie_list_item_book"> 예매하기</span>
            </div>
          </div>

    );
  };
  export default MovieListDetail;
  