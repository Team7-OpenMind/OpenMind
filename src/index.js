import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "App";
import "common.css";
import React from "react";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 포커스를 얻었을 때 다시 데이터를 가져올지 여부
      retry: 3, // 요청이 실패한 경우 재시도 횟수
      retryDelay: 1000, // 재시도 간격
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
