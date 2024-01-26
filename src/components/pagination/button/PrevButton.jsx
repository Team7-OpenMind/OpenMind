import { ReactComponent as ArrowLeft } from "assets/Arrow-left.svg";
import styled from "styled-components";

function LeftButton({ className, disabled }) {
  return (
    <button
      className={`${className} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={() => console.log("hi")}
    >
      <ArrowLeft />
    </button>
  );
}
const PrevButton = styled(LeftButton)`
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

export default PrevButton;
