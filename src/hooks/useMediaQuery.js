import { useCallback, useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.innerWidth <= 767);

  // 미디어 쿼리의 변경사항을 감지하고, matches 상태값을 변경함.
  const handleMediaQueryChange = useCallback(
    (event) => {
      setMatches(event.matches);
    },
    [setMatches],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query); // query가 변경될 때마다 mediaQuery 객체 생성
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query, handleMediaQueryChange]);

  return matches;
};

export default useMediaQuery;
