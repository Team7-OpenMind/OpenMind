import { createContext, useContext } from "react";
import { ReactComponent as CloseSVG } from "assets/Close.svg";
import { ReactComponent as MessageSVG } from "assets/Messages.svg";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalContext = createContext();

function Modal({ open, onClose, onSubmit, children }) {
  if (!open) return;

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ open, onClose, onSubmit }}>
      <ModalBg>
        <ModalContainer>{children}</ModalContainer>
      </ModalBg>
    </ModalContext.Provider>,
    document.getElementById("modal-container"),
  );
}

export default Modal;

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

function Header({ children }) {
  const { onClose } = useContext(ModalContext);

  return (
    <HeaderWrapper>
      <TextWrapper>
        <MessageSVG />
        {children}
      </TextWrapper>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
    </HeaderWrapper>
  );
}

function Body({ children }) {
  return <div>{children}</div>;
}

function Footer({ children }) {
  const { onSubmit } = useContext(ModalContext);

  return <button onClick={onSubmit}>{children}</button>;
}

const ModalBg = styled.div`
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

const ModalContainer = styled.div`
  border-radius: 24px;
  width: 80%;
  height: 568px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  background-color: var(--Grayscale-10);
  box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);

  @media (min-width: 768px) {
    width: 612px;
    height: 454px;
    padding: 40px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 25px;
  font-size: 20px;

  @media (min-width: 768px) {
    line-height: 30px;
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  width: 22px;
  height: 22px;

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const Close = styled(CloseSVG)`
  width: 22px;
  height: 22px;

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;
