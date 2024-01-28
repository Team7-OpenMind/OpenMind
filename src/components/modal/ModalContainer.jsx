import ReactDOM from "react-dom";
import styled from "styled-components";

function ModalContainer({ open, children }) {
  console.log(children);
  console.log(open);
  if (!open) return;

  return ReactDOM.createPortal(
    <ModalWrapper>{children}</ModalWrapper>,
    document.getElementById("modal-container"),
  );
}

export default ModalContainer;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.56);
`;
