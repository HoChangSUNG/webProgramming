import axios from "axios";

const SignUpPage = () => {
    const sendSignUpData = () => {
        const userId = document.querySelector("#signUpUserId").value;
        const pw = document.querySelector("#signUpPassword").value;
        const name = document.querySelector("#signUpName").value;

        axios
          .post(
            "http://localhost:8080/users/signUp",{
              "userId":userId,
              "pw":pw,
              "name":name
          },    { withCredentials :true}
          )
          .then((res) => {
            const {result}=res.data;
            if(result=="success"){
              window.location.href = '/';
                alert("회원가입 성공");
            }
            else{
              alert("중복되는 아이디가 있습니다.");
            }
          });
      };


  return (
    <div className="signUp-page-container">
      <div className="signUp-page-content">
        <div id="signUp-form">
          <div className="signUp_fieldset_div">
            <div className="fieldset-title">회원가입</div>
            <div className="signUp">
              <input type="text" id="signUpUserId" name="signUpUserId" placeholder="아이디를 입력해주세요"></input>
              <input type="text" id="signUpPassword" name="signUpPassword" placeholder="비밀번호를 입력해주세요"></input>
              <input type="text" id="signUpName" name="signUpName" placeholder="이름을 입력해주세요"></input>
            </div>

            <button id="submit-signUp" title="회원가입" onClick={sendSignUpData}>
              <span>회원가입</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
