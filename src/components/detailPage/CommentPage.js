import classnames from 'classnames';
import Moment from 'react-moment';
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import axios from "axios";


const CommentPage = (props) => {
    const plusLike =()=>{
        axios
        .post(
          "http://localhost:8080/comments/like/plus",
          {
            "commentId": props.commentInfo.commentId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          const {result} = res.data;
          result ?  window.location.replace("/movies/" + props.movieId):alert("로그인 후 이용해주세요.");

        });
    }
    const minusLike =()=>{
        console.log("minusLike 함수");
        axios
        .post(
            "http://localhost:8080/comments/like/minus",
          {
            "commentId": props.commentInfo.commentId,
          },
          { withCredentials: true }
        )
        .then((res) => {
            console.log(res);
          const {result} = res.data;
          console.log(result)
          result ?  window.location.replace("/movies/" + props.movieId):alert("로그인 후 이용해주세요.");

        });
    }

    const showCommentInput=()=>{
        document.querySelector(`#movie_point_comment_content_edit${props.keyIndex}`).classList.toggle("offCommentWriteActive");
        document.querySelector(`#movie_point_comment_content_not_edit${props.keyIndex}`).classList.toggle("offCommentWriteActive");
        document.querySelector(`#toggle_comment_update_click_btn${props.keyIndex}`).classList.toggle("offCommentWriteActive");
        document.querySelector(`#send_comment_update_click_btn${props.keyIndex}`).classList.toggle("offCommentWriteActive");
        

    }
    const sendCommentUpdate=()=>{ // 댓글 수정
        const updateContent = document.querySelector(`#movie_point_comment_content_edit${props.keyIndex}`).value;
        const commentId = props.commentInfo.commentId;
        
          axios
        .patch(
            "http://localhost:8080/comments",
          {
            "commentId": commentId,
            content:updateContent
          },
          { withCredentials: true }
        )
        .then((res) => {
            console.log(res.data);
        window.location.replace("/movies/" + props.movieId)

        });


    }
    return (
        <li className="movie_point_list_item">
        <div>
          <div className="movie_point_comment_img"></div>
          <p className="movie_point_comment_name">{props.commentInfo.username} </p>
          <p className="movie_point_comment_content " id={"movie_point_comment_content_not_edit"+props.keyIndex}>
          
          {props.commentInfo.content}</p>
          <textarea defaultValue={props.commentInfo.content} className="movie_point_comment_content offCommentWriteActive" id={"movie_point_comment_content_edit"+props.keyIndex}>
          
          </textarea>
        </div>
        <div className="movie_point_list_comment_sub">
          <div className="comment_createdDate"><Moment format='YYYY.MM.DD'>{props.commentInfo.createdAt}</Moment> | </div>
          {props.commentInfo.isPossibleLike?
          <AiOutlineLike fontSize="22px" onClick={plusLike}/>:<AiTwotoneLike fontSize="22px" onClick={minusLike}/>}
          <div className="comment_like_cnt">{props.commentInfo.likeCnt}{'\u00A0'}{'\u00A0'}|{'\u00A0'} 평점 : {props.commentInfo.rate}</div>
          
          {props.commentInfo.editable?<div className="comment_update"id={'toggle_comment_update_click_btn'+props.keyIndex} onClick={showCommentInput}>수정하기</div>:""}
          <div className="comment_update offCommentWriteActive" id={"send_comment_update_click_btn"+props.keyIndex} onClick={sendCommentUpdate}>수정완료</div>
        </div>
      </li>
    );
  };
  export default CommentPage;
  