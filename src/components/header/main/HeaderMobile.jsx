import { ReactComponent as ArrowSVG } from "assets/Arrow.svg";
import Button from "components/button/Button";
import styled from "styled-components";
import LogoSVGMobile from "./logo/LogoMobile";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

const StyledButton = styled(Button)`
  border-style: none;
  outline: 1px solid var(--Brown-40);
  padding: 8px 12px;
  background-color: var(--Brown-10);
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 18px;
  font-size: 14px;
  color: var(--Brown-40);

  &:hover {
    outline: 2px solid var(--Brown-40);
  }

  &:active {
    outline: 2px solid var(--Brown-40);
    background-color: var(--Brown-20);
  }
`;

const Arrow = styled(ArrowSVG)`
  width: 18px;
  path {
    fill: var(--Brown-40);
  }
`;

function HeaderMobile() {
  return (
    <Wrapper>
      <LogoSVGMobile />
      <StyledButton>
        질문하러 가기
        <Arrow />
      </StyledButton>
    </Wrapper>
  );
}

export default HeaderMobile;
