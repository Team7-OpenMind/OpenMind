import { ReactComponent as ArrowSVG } from "assets/Arrow.svg";
import Button from "components/button/Button";
import styled from "styled-components";
import LogoSVG from "./logo/Logo";

function Header({ onClick }) {
  return (
    <Wrapper>
      <ButtonWrapper>
        <StyledButton onClick={onClick}>
          질문하러 가기
          <Arrow />
        </StyledButton>
      </ButtonWrapper>
      <Logo />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  max-width: 1200px;
  padding-right: 50px;
  display: flex;
  justify-content: end;

  @media (min-width: 1200px) {
    margin: 0 auto;
  }
`;

const StyledButton = styled(Button)`
  border-style: none;
  outline: 1px solid var(--Brown-40);
  padding: 12px 24px;
  background-color: var(--Brown-10);
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 22px;
  font-size: 16px;
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

const Logo = styled(LogoSVG)`
  width: 100%;
  margin: 70px auto 0;
`;

export default Header;
