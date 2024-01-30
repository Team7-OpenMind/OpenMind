import { createContext, useRef } from "react";
import { ReactComponent as CloseSVG } from "assets/Close.svg";
import { ReactComponent as MessageSVG } from "assets/Messages.svg";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalContext = createContext();

function Modal({ onClose, onSubmit, children }) {
  const modalRef = useRef(null);

  // useRef를 이용해 모달창 바깥을 누르면 모달창 꺼지도록 함
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ onClose, onSubmit }}>
      <ModalBg onClick={handleClickOutside}>
        <ModalContainer ref={modalRef}>{children}</ModalContainer>
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
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <TextWrapper>
        <MessageSVG />
        {children}
      </TextWrapper>
      <CloseButton onClick={() => navigate(-1)}>
        <Close />
      </CloseButton>
    </HeaderWrapper>
  );
}

function Body({ children }) {
  return <>{children}</>;
}

function Footer({ children }) {
  return <>{children}</>;
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
