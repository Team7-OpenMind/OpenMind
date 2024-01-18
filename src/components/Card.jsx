import React, { useEffect, useRef } from "react";

export function Card({ className, name, imageSource, questionCount }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef?.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 186) {
          // FIXME : change magic number
          // TODO : change Card List Layout( show 6 Cards )
        } else {
          // TODO : change Card List Layout( show 8 Cards )
        }
      }
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [cardRef]);
  return (
    <div className={className} ref={cardRef}>
      <div>{name}</div>
      <div>
        <div>받은질문</div>
        <div>{questionCount}</div>
      </div>
    </div>
  );
}

export default Card;
