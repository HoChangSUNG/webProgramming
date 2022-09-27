import { useRef, useState, useEffect } from "react";
import axios from "axios";

const showMemberInfo = (e) => {
  e.stopPropagation();
  document.querySelector("#memberInfo_wrap").classList.toggle("onActive");
  document.querySelector("#hamburger").classList.toggle("offActive");
  document
    .querySelector("#hamburgerDisapperBtnDiv")
    .classList.toggle("onActiveBlock");
};

const disappearMemberInfo = (e) => {
  document.querySelector("#memberInfo_wrap").classList.toggle("onActive");
  document.querySelector("#hamburger").classList.toggle("offActive");
  document
    .querySelector("#hamburgerDisapperBtnDiv")
    .classList.toggle("onActiveBlock");

  e.stopPropagation();
};

const doLogout = () => {//로그아웃 요청 보냄
  axios
    .get("http://localhost:8080/users/logout", { withCredentials: true })
    .then((res) => {
      alert("로그아웃");
    })
    .catch((err) => console.log(err));
};

const Header = () => {
  const [loginInfo, setLoginInfo] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/login", { withCredentials: true })
      .then((res) => {
        setLoginInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return loginInfo ? (
    <div className="header">
      <div className="header_content">
        <div className="contents">
          <div className="hamburger" id="hamburger" onClick={showMemberInfo}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <h1>
            <a href="/">
              <img src="/img/logo/cgvLogo.png"></img>
            </a>
            <span>CULTUREPLEX</span>
          </h1>
          <ul className="memberInfo_wrap" id="memberInfo_wrap">
            {loginInfo.login ? (
              <li>
                <a href="" onClick={doLogout}>
                  <img src="/img/logo/loginLogo.png"></img>
                  <span>로그아웃</span>
                </a>
              </li>
            ) : (
              <li>
                <a href="/login">
                  <img src="/img/logo/loginLogo.png"></img>
                  <span>로그인</span>
                </a>
              </li>
            )}
            {!loginInfo.login ? (
              <li>
                <a href="/signUp">
                  <img src="/img/logo/signUpLogo.png"></img>
                  <span>회원가입</span>
                </a>
              </li>
            ) : (
              ""
            )}

            <li>
              <a href="/myPage">
                <img src="/img/logo/myCgvLogo.png"></img>
                <span>MY CGV</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/img/logo/serviceCenterLogo.png"></img>
                <span>고객센터</span>
              </a>
            </li>
          </ul>
          <div className="hamburgerDisapperBtnDiv" id="hamburgerDisapperBtnDiv">
            <p
              id="menuDisappearBtn"
              className="hamburgerDisapperBtn"
              onClick={disappearMemberInfo}
            >
              x
            </p>
          </div>
        </div>
      </div>
      <ul className="menu">
        <li>
          <h2>
            <a href="/movies">영화</a>
          </h2>
        </li>
        <li>
          <h2>
            <a href="/theater">극장</a>
          </h2>
        </li>
      </ul>
    </div>
  ) : (
    <div></div>
  );
};

export default Header;
