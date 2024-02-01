import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * @param {string} url
 * @param {*} initialData
 * @param {import("@tanstack/react-query").UseQueryOptions} options
 * @returns
 */
export function useGetQuery(url, initialData, options = {}) {
  const { data, error, isFetching, isLoading } = useQuery({
    // react-query의 useQuery 옵션
    url,
    initialData,

    // 데이터를 가져오는 동안 발생한 오류를 처리하는 함수
    onError: (error) => {
      console.error("Error fetching data:", error);
    },

    // 실제 데이터를 가져오는 비동기 함수
    async queryFn() {
      const res = await axios.get(url);
      return res.data;
    },
    queryKey: [url], // 캐시 키로 사용될 배열
    ...options, // react-query 기타 옵션
  });

  return { data, error, isLoading: isFetching || isLoading };
}

export function usePostMutation(url, options = {}) {
  const mutation = useMutation(async (data) => {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }, options);

  return mutation;
}

axios.interceptors.request.use((config) => {
  if (config.method.toLowerCase() != "get") {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const { status, statusText } = response;
    if (status >= 400) {
      const error = new Error(statusText);
      error.response = response;
      return Promise.reject(error);
    }
    return response;
  },
  (error) => {
    console.error("Error fetching data:", error);
    return Promise.reject(error);
  },
);
