import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "App";
import { CenteredContainer } from "components";
import Loading from "components/loading/Loading";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "store";
import "./common.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 포커스를 얻었을 때 다시 데이터를 가져올지 여부
      retry: 3, // 요청이 실패한 경우 재시도 횟수
      retryDelay: 1000, // 재시도 간격
    },
  },
});

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate
        loading={
          <CenteredContainer>
            <Loading />
          </CenteredContainer>
        }
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
);
