import Button from "components/button/Button";
import Modal from "components/modal/Modal";
import styled from "styled-components";

function QuestionModal({ open, onClose, userInfo }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>질문해주세용</Modal.Header>
      <Modal.Body>
        <UserInfo>
          To.
          <ProfileImg src={userInfo?.imageSource} />
          {userInfo?.name}
        </UserInfo>
        <Form>
          <Input placeholder="질문을 입력해주세요" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonWrapper>질문 보내기</ButtonWrapper>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionModal;

const UserInfo = styled.div`
  margin-top: 40px;
  margin-bottom: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  line-height: 22px;
  font-size: 18px;
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  overflow: hidden;
`;

const Form = styled.form`
  width: 100%;
  height: 358px;
  border-radius: 8px;
  background: var(--Grayscale-20, #f9f9f9);

  @media (min-width: 768px) {
    width: 532px;
    height: 180px;
  }
`;

const Input = styled.input`
  padding: 16px;
`;

const ButtonWrapper = styled(Button)`
  box-sizing: border-box;
  margin-top: 8px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  font-size: 16px;
`;
