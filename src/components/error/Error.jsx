import logo from "assets/logo.svg";
import "common.css";
import styled from "styled-components";

const ErrorStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--Grayscale-20);
  color: var(--Brown-40);
`;

export function Error() {
  return (
    <ErrorStyled>
      <img src={logo} alt="logo" />
      에러가 발생했습니다.
    </ErrorStyled>
  );
}

export default Error;
