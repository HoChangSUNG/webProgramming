
const MovieCarouselDetail=(props)=> {
  return (
            <div className = "movie_carousel_item">
              <div className="movie_carousel_img_wrap" data-rank = {props.rank}>
                <img className="movie_carousel_img" src={props.posterDetail.imgSrc} ></img>
                <div className={"movie_carousel_img_limit_age"+ (props.posterDetail.ageLimit=='전체'?" ageAlLimit_color":(props.posterDetail.ageLimit=='12'?" age12Limit_color":" age15Limit_color") )}>{props.posterDetail.ageLimit}</div>
              </div>
              
              <div className="carousel_movie_name">{props.posterDetail.movieName}</div>
              <div>평점{'\u00A0'} {props.posterDetail.movieRate}% {'\u00A0'}| {'\u00A0'}예매율{'\u00A0'} {props.posterDetail.bookingRate}%</div>  
              {/* {'\u00A0'} -> 띄어쓰기 */}
            </div>
    );
}
export default MovieCarouselDetail;
