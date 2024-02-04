import { useState } from "react";
import { createSubjectUrl } from "api/questionApi";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";
import styled from "styled-components";
import SignInputBar from "components/inputBar/SignInputBar";
import useMediaQuery from "hooks/useMediaQuery";
import HeaderMobile from "components/header/main/HeaderMobile";
import Header from "components/header/main/Header";
import axios from "axios";
import { ReactComponent as mainBgSvg } from "assets/mainBG.svg";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-top: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (min-width: 768px) {
    padding-top: 45px;
  }
`;

const InputBox = styled.form`
  position: relative;
  width: 80%;
  max-width: 400px;
  border-radius: 16px;
  padding: 24px;
  background-color: var(--Grayscale-10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const SubmitButton = styled(Button)`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
`;

const MainImage = styled(ImageSVG)`
  position: absolute;
  width: 120%;
  bottom: 0;
  z-index: -1;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

function Home() {
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery("(max-width: 767px");
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/list");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(createSubjectUrl(), {
        name: inputValue,
        team: "3-7",
      });

      if (response.status !== 201) {
        throw new Error("subject 생성에 실패했습니다.");
      }

      const { data } = response;
      localStorage.setItem("subjectId", data.id);
      navigate(`/post/${data.id}/answer`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      {isMobile ? (
        <HeaderMobile onClick={handleNavigate} />
      ) : (
        <Header onClick={handleNavigate} />
      )}
      <InputBox>
        <SignInputBar
          placeholder="이름을 입력하세요"
          value={inputValue}
          onChange={handleInputChange}
        />
        <SubmitButton onClick={handleSubmit}>질문 받기</SubmitButton>
      </InputBox>
      <MainImage />
    </Wrapper>
  );
}

function ImageSVG({ className }) {
  return (
    <div className={className}>
      <MainSvg />
    </div>
  );
}

const MainSvg = styled(mainBgSvg)``;

export default Home;
