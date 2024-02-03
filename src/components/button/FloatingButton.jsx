const { styled } = require("styled-components");

function FloatingButton({ className, children, onClick }) {
  return (
    <StyledFloationButton className={className} onClick={onClick}>
      {children}
    </StyledFloationButton>
  );
}

const StyledFloationButton = styled.button`
  cursor: pointer;
  border-radius: 200px;
  background-color: var(--Brown-40);
  padding: 12px 24px;
  color: var(--Grayscale-10);
`;

export default FloatingButton;
