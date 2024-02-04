import logo from "assets/logo.svg";
import styled from "styled-components";

Error.defaultProps = {
  message: "에러가 발생했습니다",
};

export function Error(props) {
  return (
    <ErrorStyled>
      <img src={logo} alt="logo" />
      {props.message}
    </ErrorStyled>
  );
}

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

export default Error;
