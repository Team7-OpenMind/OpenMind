import { ReactComponent as ArrowRight } from "assets/Arrow-right.svg";
import styled from "styled-components";

function RightButton({ className, onClick, disabled }) {
  return (
    <button
      className={`${className} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowRight />
    </button>
  );
}

const NextButton = styled(RightButton)`
  cursor: pointer;
  height: 24px;

  &:hover,
  :active {
    path {
      fill: var(--Brown-40);
    }
  }
  &.disabled {
    cursor: default;
    path {
      fill: var(--Grayscale-40);
    }
  }
`;

export default NextButton;
