import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as arrowUp } from "assets/Arrow-up.svg";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function Dropdown({ items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const order = searchParam.get("order");
  const arrowRef = useRef(null);
  const dropdownRef = useRef(null);

  function dropDownItems() {
    return items.map((item, index) => (
      <div key={index} onClick={onClickDropdownItem}>
        {item}
      </div>
    ));
  }

  function onClickDropdown(e) {
    e.stopPropagation();
    openDropdown(!isOpen);
  }

  function onClickDropdownItem(e) {
    e.stopPropagation();
    openDropdown(false);
    onSelect(e.target.innerText);
  }

  function onClickWindow() {
    openDropdown(false);
  }

  function openDropdown(flag) {
    const element = dropdownRef?.current;
    const arrow = arrowRef?.current;
    if (!element || !arrow) return;

    if (flag) {
      arrow.style.transform = "rotate(-180deg)";
      element.style.transform = "scaleY(1)";
      setIsOpen(true);
    } else {
      arrow.style.transform = "rotate(0deg)";
      element.style.transform = "scaleY(0)";
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", onClickWindow);
  });

  return (
    <DropdownStyled>
      <SelectItem onClick={onClickDropdown} isOpen={isOpen}>
        <div>{order === "name" ? "이름순" : "최신순"}</div>
        <Arrow src={arrowUp} ref={arrowRef} isOpen={isOpen} />
      </SelectItem>
      <DropdownItems ref={dropdownRef}>{dropDownItems()}</DropdownItems>
    </DropdownStyled>
  );
}

export default Dropdown;

const DropdownStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 4px;

  > div {
    font-family: Pretendard;
    font-size: 14px;
  }
`;

const SelectItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: #818181;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.isOpen ? "var(--Grayscale-60)" : "var(--Grayscale-40)")};
  background: var(--Grayscale-10, #fff);

  padding: 8px 12px;
  gap: 4px;

  > div {
    display: flex;

    justify-content: center;
    align-items: center;

    color: ${(props) =>
      props.isOpen ? "var(--Grayscale-60)" : "var(--Grayscale-40)"};
  }
`;

const Arrow = styled(arrowUp)`
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease-in-out;

  path {
    fill: ${(props) =>
      props.isOpen ? "var(--Grayscale-60)" : "var(--Grayscale-40)"};
  }
`;

const DropdownItems = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--Grayscale-10);
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform 0.3s ease-in-out;

  border-radius: 8px;
  border: 1px solid var(--Grayscale-30);
  background: var(--Grayscale-10);
  /* 1pt */
  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
  overflow: hidden;

  > div {
    display: flex;
    padding: 6px 16px;

    font-family: Pretendard; // TODO : add font
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    background: var(--Grayscale-10);
  }

  > div:hover {
    color: var(--Blue-50);
  }
`;
