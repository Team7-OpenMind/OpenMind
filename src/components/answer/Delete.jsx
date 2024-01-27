import styled from "styled-components";
import Button from "components/button/Button";

const DeleteBtn = ({ questionId }) => {
  return <DeleteButton>삭제하기</DeleteButton>;
};

const DeleteButton = styled(Button)`
  text-align: center;
  padding: 0;
  width: 70px;
  height: 25px;
  font-size: 10px;
  font-weight: 400;
  line-height: 25px;
  border-radius: 200px;
  margin-top: 23px;
  position: absolute;
  top: -60px;
  right: 0;
  @media (min-width: 768px) {
    top: -70px;
    font-size: 15px;
    width: 100px;
    height: 35px;
  }
`;

export default DeleteBtn;
