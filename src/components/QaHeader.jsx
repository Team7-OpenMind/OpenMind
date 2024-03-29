import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../common.css";

// 이미지 파일들
import headerPng from "../assets/header.png";
import logoSvg from "../assets/logo.svg";
import { ReactComponent as LinkSvg } from "../assets/Link.svg";
import kakaotalkSvg from "../assets/Kakaotalk.svg";
import { ReactComponent as FacebookSvg } from "../assets/Facebook.svg";
import { DOMAIN_URL } from "api";
import { copyClipboard, shareFacebook, shareKakao } from "utils/share";
import { Toast } from "./toast/Toast";

function QaHeader({ subject, back = "/list" }) {
  const [toastMsg, setToastMsg] = useState("");
  const location = useLocation();
  const url = `${DOMAIN_URL}${location.pathname}${location.search}`;

  function onClickLink() {
    copyClipboard(url)
      .then(() => {
        setToastMsg(`${url}이(가) 복사되었습니다.`);
      })
      .catch(() => {
        setToastMsg("클립보드 복사에 실패했습니다.");
      });
  }

  function onCloseToast() {
    setToastMsg("");
  }

  return (
    <header>
      <HeaderBg>
        <GoToListPage>
          <Link to={back}> {`Back To LIST`}</Link>
        </GoToListPage>
        <HeaderContentBox>
          <Link to="/">
            <Logo src={logoSvg} alt="로고" />
          </Link>
          <UserImg src={subject.imageSource} />
          <UserName>{subject.name}</UserName>
          <ShareButtonBox>
            <ShareButton icon="link" onClick={onClickLink}>
              <LinkSvg fill="white" />
            </ShareButton>
            <ShareButton icon="kakaotalk" onClick={() => shareKakao(url)}>
              <img src={kakaotalkSvg} alt="카카오톡 아이콘" />
            </ShareButton>
            <ShareButton icon="facebook" onClick={() => shareFacebook(url)}>
              <FacebookSvg fill="white" />
            </ShareButton>
          </ShareButtonBox>
        </HeaderContentBox>
      </HeaderBg>
      <Toast msg={toastMsg} onClose={onCloseToast} />
    </header>
  );
}

// Styled Component들
const COLOR = {
  link: "--Brown-40",
  kakaotalk: "--Yellow-50",
  facebook: "--Blue-50",
};

const animation = keyframes`
  0% {
    transform: rotateZ(8deg);

  }
  50% {
    transform: rotateZ(-8deg);
  }
  100%{
    transform: rotateZ(8deg);

  }
`;

const GoToListPage = styled.button`
  position: absolute;
  left: 12px;
  top: 6px;
  padding: 5px;
  font-weight: 800;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    animation: ${animation} 0.8s ease-in-out infinite;
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ShareButton = styled.button`
  background-color: var(${({ icon }) => COLOR[icon]});
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const ShareButtonBox = styled.div`
  gap: 12px;
  display: flex;
  width: 144px;
  height: 40px;
`;

const Logo = styled.img`
  width: 124px;
  height: 49px;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 170px;
    height: 67px;
  }
`;

const UserImg = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 24px;
  font-family: Actor;
  font-weight: 400;
  line-height: 30px;
`;

const HeaderContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 40px;
`;

const HeaderBg = styled.div`
  background-image: url(${headerPng});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 177px;
  margin-bottom: 145px;
  position: relative;
`;

export default QaHeader;
