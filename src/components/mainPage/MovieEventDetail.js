const MovieEventDetail = ({eventDetail}) => {
  return (
    <div className="movie_event_item">
      <img className="main_event_img" src={eventDetail.imgSrc}></img>
      <strong>{eventDetail.eventTitle}</strong>
      <span>{eventDetail.eventDuring}</span>
    </div>
  );
};
export default MovieEventDetail;
