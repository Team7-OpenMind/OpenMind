import styled from "styled-components";

function Button({ className, children, onClick }) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  outline: 1px solid var(--Brown-40);
  border-style: none;
  border-radius: 8px;
  background-color: var(--Brown-40);
  padding: 12px 24px;
  color: var(--Grayscale-10);

  &:hover {
    outline: 2px solid var(--Brown-40);
  }

  &:active {
    outline: 2px solid var(--Brown-40);
    background-color: var(--Brown-50);
  }
`;

export default Button;
