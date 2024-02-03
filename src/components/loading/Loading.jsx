import loadingGif from "assets/loading.gif";
import styled from "styled-components";

export function Loading() {
  return (
    <LoadingStyled>
      <img src={loadingGif} alt="loading" />
      <LoadingText>로딩중입니다.</LoadingText>
    </LoadingStyled>
  );
}

const LoadingStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--Brown-40);

  & > img {
    width: 70px;
    height: 70px;
  }
`;

const LoadingText = styled.p`
  color: var(--Brown-40);
  font-size: 1.1em;
`;

export default Loading;
