import { useQuery as useReactQuery } from "@tanstack/react-query";
import axios from "axios";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useQuery(url, initialData, loadingDelay) {
  const { data, error, isFetching, isLoading } = useReactQuery({
    url,
    initialData,
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
    async queryFn() {
      const res = await axios.get(url);
      const { status } = res;
      if (status >= 400) {
        const message = `An error has occured: ${status}`;
        throw new Error(message);
      }
      await delay(loadingDelay);
      return res.data;
    },
    queryKey: [url],
    retry: 3, // Number of retries if request fails
    retryDelay: 1000, // Delay between retries in milliseconds
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
  });

  return { data, error, isLoading: isFetching || isLoading };
}

export default useQuery;
