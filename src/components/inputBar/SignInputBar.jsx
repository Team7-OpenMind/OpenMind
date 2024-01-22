import { ReactComponent as PersonSVG } from "assets/Person.svg";
import styled from "styled-components";

const Person = styled(PersonSVG)`
  position: absolute;
  top: 35px;
  left: 40px;
  path {
    fill: var(--Grayscale-40);
  }

  @media (min-width: 768px) {
    top: 43px;
    left: 47px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid var(--Grayscale-40);
  border-radius: 8px;
  padding: 12px 42px;
  background-color: var(--Grayscale-10);
  font-size: 16px;
  line-height: 22px;
`;

function SignInputBar({ placeholder, value, onChange }) {
  return (
    <>
      <Person />
      <Input
        name="name"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default SignInputBar;
