import styled from "styled-components";
import "../common.css";
// 이미지 파일들
import headerPng from "../assets/header.png";
import logoSvg from "../assets/logo.svg";
import personSvg from "../assets/Person.svg";
import linkSvg from "../assets/Link.svg";
import kakaotalkSvg from "../assets/Kakaotalk.svg";
import facebookSvg from "../assets/Facebook.svg";

const COLOR = {
  link: "--Brown-40",
  kakaotalk: "--Yellow-50",
  facebook: "--Blue-50",
};

const ShareButton = styled.span`
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

// 유저 데이터 받아와야함 - 잠시 아이콘으로 대체
// 컴포넌트 스타일로 만들어야 할 것 - 유저 프로필, 유저명?, header큰 레이아웃,
function QaHeader() {
  return (
    <header>
      <img src={headerPng} />
      <div>
        <img src={logoSvg} />
        <img src={personSvg} />
        <span>유저명</span>
        <ShareButtonBox>
          <ShareButton icon="link">
            <img src={linkSvg} />
          </ShareButton>
          <ShareButton icon="kakaotalk">
            <img src={kakaotalkSvg} />
          </ShareButton>
          <ShareButton icon="facebook">
            <img src={facebookSvg} />
          </ShareButton>
        </ShareButtonBox>
      </div>
    </header>
  );
}

export default QaHeader;
