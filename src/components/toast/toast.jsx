import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: inline-flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: var(--Grayscale-60, #000);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  color: var(--Grayscale-10, #fff);
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.125rem;

  z-index: 10;
`;

export function Toast({ msg }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(msg);
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [msg]);
  if (message === "") return <></>;

  return <ToastContainer>{message}</ToastContainer>;
}
