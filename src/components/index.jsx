/** 공통 컴포넌트 */
import { useState } from "react";
import styled from "styled-components";

/** isDeferred가 true가 될 때 까지 화면에서 숨김 */
export const DeferredImage = ({ children, ...props }) => {
  const [isDeferred, setIsDeferred] = useState(false);

  const handleImageLoad = () => {
    setIsDeferred(true);
  };

  return (
    <>
      <DeferredImageStyled
        {...props}
        isDeferred={isDeferred}
        onLoad={handleImageLoad}
      />
      {isDeferred && children}
    </>
  );
};

export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${(props) => props.vertical !== false && "height: 100%;"}
`;

/** 화면에서만 숨기고 DOM에는 로딩 */
const DeferredImageStyled = styled.img`
  visibility: ${(props) => (props.isDeferred ? "visible" : "hidden")};
`;
