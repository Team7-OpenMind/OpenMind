import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as arrowUp } from "assets/Arrow-up.svg";

// style
const DropdownStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 4px;
`;

const SelectItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: #818181;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.isOpen ? "#000000" : "#818181")};
  background: var(--Grayscale-10, #fff);

  padding: 8px 12px;
  gap: 4px;

  > div {
    display: flex;

    justify-content: center;
    align-items: center;

    color: ${(props) => (props.isOpen ? "#000000" : "#818181")};
  }
`;

const Arrow = styled(arrowUp)`
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease-in-out;

  path {
    fill: ${(props) => (props.isOpen ? "#000000" : "#818181")};
  }
`;

const DropdownItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--Grayscale-10, #fff);
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform 0.3s ease-in-out;

  border-radius: 8px;
  border: 1px solid var(--Grayscale-30, #cfcfcf);
  background: var(--Grayscale-10, #fff);
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
    background: var(--Grayscale-10, #fff);
  }

  > div:hover {
    color: #1877f2;
  }
`;

// component
export function Dropdown({ items, onSelect }) {
  const [item, setItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
    setItem(e.target.innerText);
    openDropdown(false);
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
    if (item == "" && items.length > 0) {
      setItem(items[0]);
    }
    onSelect(item); // FIXME : warning cause
  }, [item, items]);

  useEffect(() => {
    document.addEventListener("click", onClickWindow);
  });

  return (
    <DropdownStyled>
      <SelectItem onClick={onClickDropdown} isOpen={isOpen}>
        <div>{item}</div>
        <Arrow src={arrowUp} ref={arrowRef} isOpen={isOpen} />
      </SelectItem>
      <DropdownItems ref={dropdownRef}>{dropDownItems()}</DropdownItems>
    </DropdownStyled>
  );
}

export default Dropdown;
