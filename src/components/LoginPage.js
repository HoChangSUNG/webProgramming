import axios from "axios";

  const sendLoginData = (id,pw) => {
    axios
      .post(
        "http://localhost:8080/users/login",{
          "userId":id,
          "pw":pw
      },    { withCredentials :true}
      )
      .then((res) => {
        const {result}=res.data;
        if(result=="success"){
          window.location.href = '/';
        }
        else{
          alert("아이디 또는 패스워드가 맞지 않습니다. 확인 후 입력해주세요.");
        }
      });
  };

const doLogin=()=>{

  const userId = document.querySelector("#txtUserId").value;
  const pw = document.querySelector("#txtPassword").value;
  if(!userId){
    alert("아이디를 입력해주세요.");
    return;
  }
  else if(!pw){
    alert("비밀번호를 입력해주세요.");
    return;
  }
  else{
    sendLoginData(userId,pw);
  }

}
const LoginPage = () => {


  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <div id="login-form">
            
          <div className="login_fieldset_div">
          <div className="fieldset-title">로그인</div>
            <div className="login">
              <input
                type="text"
                title="아이디"
                id="txtUserId"
                name="txtUserId"
                data-title="아이디를 "
                data-message="입력하세요."
                
              ></input>
              <input
                type="password"
                title="패스워드"
                id="txtPassword"
                name="txtPassword"
                data-title="패스워드를 "
                data-message="입력하세요."
                
              ></input>
            </div>

            <button id="submit-login" title="로그인" onClick={doLogin}>
              <span>로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
