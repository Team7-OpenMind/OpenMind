import { useQuery as useReactQuery } from "@tanstack/react-query";
import axios from "axios";

// 비동기 작업을 지연시키기 위한 함수
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useQuery(url, initialData, loadingDelay) {
  const { data, error, isFetching, isLoading } = useReactQuery({
    url,
    initialData,

    // 데이터를 가져오는 동안 발생한 오류를 처리하는 함수
    onError: (error) => {
      console.error("Error fetching data:", error);
    },

    // 실제 데이터를 가져오는 비동기 함수
    async queryFn() {
      const res = await axios.get(url);
      const { status, statusText } = res;
      if (status >= 400) {
        const error = new Error(statusText);
        error.response = res;
        throw error;
      }
      await delay(loadingDelay);
      return res.data;
    },
    queryKey: [url], // 캐시 키로 사용될 배열
    retry: 3, // 요청이 실패한 경우 재시도 횟수
    retryDelay: 1000, // 재시도 간격
    refetchOnWindowFocus: false, // 창이 포커스를 얻었을 때 다시 데이터를 가져올지 여부
  });

  return { data, error, isLoading: isFetching || isLoading };
}

export default useQuery;
