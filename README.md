# <p align="center">OpenMind</p>

<p align="center"><img src="https://github.com/Team7-OpenMind/OpenMind/assets/68732996/1de010d9-c973-4491-8035-23150b0bc981" width="500" /></p>


## 🔍 프로젝트 정보
* React를 이용해 사용자들이 질의응답할 수 있는 페이지를 간단한 게시판 형식으로 구현
* 개발기간: 2023.1.18 ~ 2024.1.31(2주)
* 역할분담<br/>
    * 오영곤(팀장): 질문 목록 페이지, 무한스크롤, 공유하기 기능, 토스트<br/>
    * 고현우: 메인 페이지, 페이지네이션, 질문 모달창, 질문 작성하기 기능<br/>
    * 박진아: 질문 피드 페이지, 질문&답변 페이지 공통 컴포넌트<br/>
    * 장은진:  답변하기 페이지, 수정하기, 삭제하기 기능

<br/>

## 📖 주요기능
<p align="center"><img src="https://github.com/Team7-OpenMind/OpenMind/assets/68732996/9fab6d54-4e8e-4c5c-aece-630c2fb87d29" width="500" /></p>

## 🥕 Jira 사용

이슈관리 및 git과 연동하여 Jira 이슈번호로 branch를 생성하고 PR및 merge 상태를 Jira 보드에서 확인 가능
<p align="center"><img src="https://github.com/Team7-OpenMind/OpenMind/assets/68732996/32332a98-311d-490d-a70c-b81be9acdfce" width="700" /></p>


## 🥕 Webpack 사용

여러 자바스크립트 파일을 번들 파일로 변환하여 웹페이지에서 번들 파일을 로드하는 방식으로 vercel을 통해  배포  

## 🥕 Jest 사용하여 Test 코드 구현

함수, Component 단위로 유효한 값이나 특정 요소가 있는지 검사

```jsx
/* pagination.test.js*/

it("모바일에서 startIndex + PAGE_ARRAY_LIMIT < totalPage 를 만족하면 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(1, 26, PAGE_LIMIT_MOBILE);
  const result2 = getCurrentPageArray(1, 40, PAGE_LIMIT_MOBILE);
  const result3 = getCurrentPageArray(6, 45, PAGE_LIMIT_MOBILE);

  expect(result1).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result3).toStrictEqual([6, 7, 8]);
});

it("모바일에서 현재 페이지가 < totalPage 일 때 빈 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(10, 26, PAGE_LIMIT_MOBILE);

  expect(result1).toStrictEqual([]);
});
```  

## 🥕 질문 목록(/list) 페이지에서 UserCard 크기에 따른 레이아웃 변경 기능 구현

ResizeObserver를 사용하여 Component의 크기를 감지

```jsx
/* userCard.jsx */

const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width === 0) return;

        if (entry.contentRect.width > SHOWMORE_WIDTH) {
          onShowMore(true);
          return;
        }
        if (entry.contentRect.width < SHOWLESS_WIDTH) {
          onShowMore(false);
          return;
        }
      }
    });
```  

## 🥕 Redux-toolkit, redux-persist 라이브러리 사용하여 상태 관리

프로젝트 진행 중에 `redux-toolkit`을 사용하여 상태 관리를 설정하면서 `redux-persist`도 사용하게 되었다. 

`**redux-persist`는 상태를 로컬 스토리지에 지속적으로 저장하는 기능을 구현한다.**

**Redux를 사용하여 상태를 효과적으로 관리하고 `redux-persist`를 활용하여 앱이 다시 시작될 때도 상태를 유지할 수 있게 설정을 한 것이다.**

- 코드 설명
    
    ```jsx
    import { combineReducers, configureStore } from "@reduxjs/toolkit";
    import { persistReducer } from "redux-persist";
    import storage from "redux-persist/lib/storage";
    import subjectSlice from "./subjectSlice";
    import questionSlice from "./questionSlice";
    
    const reducers = combineReducers({
      // 여러 reducer를 하나로 합쳐주는 역할
      question: questionSlice.reducer,
      subject: subjectSlice.reducer,
    });
    
    const persistedConfig = {
      key: "root", // reducer key
      storage, // local storage에 저장
      whitelist: ["question", "subject"], // user reducer만 local storage에 저장
    };
    
    const persistedReducer = persistReducer(persistedConfig, reducers); // persistReducer를 이용하여 reducer에 대한 정보를 저장, reducer를 반환시키는 API
    
    const store = configureStore({
      reducer: persistedReducer,
    });
    
    export default store;
    ```
    
    Reducers를 `combineReducers`로 합치고, `redux-persist` 설정을 위해 `persistedConfig`를 만들어 `persistReducer`에 전달한다. 
    
    `whitelist`는 `question`과 `subject` 리듀서만을 로컬 스토리지에 저장하도록 설정했다. 
    
    이후 `persistReducer`를 통해 지속적인 리듀서를 만들었고, `configureStore` 함수를 통해 Redux store를 설정하여 `persistedReducer`를 root reducer로 사용한다. 
    
    설정이 완료된 Redux store를 내보낸다.
    

- 코드 설명
    
    ```jsx
    // src/index.js
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
    ```
    
    `export let persistor = persistStore(store);`이 코드는 Redux store를 지속화하는 데 사용한다. 
    
    `persistStore(store)`함수를 호출하면 Redux store의 상태가 지속화되어 저장되고, 새로고침이나 앱 종료 후에도 상태가 유지된다.
    `<Provider store={store}>`로 Redux store를 앱에 제공한다. 
    
    `persistor`는 `<PersistGate>` 컴포넌트에서 사용되어 Redux 상태 지속을 관리한다. 
    
    앱이 처음 로드될 때 이전에 저장된 상태를 불러오고, 앱이 종료될 때마다 현재 상태를 저장한다.
    
    `<PersistGate>`를 사용해 redux 상태 지속이 준비될 때까지 기다리고 그 동안 로딩 화면을 표시한다.  
    

## 🥕 useQuery Custom Hook 사용하여 Data Fetch 모듈화

`react-query`를 더 쉽게 사용하기 위해서 useQuery Custom Hook을 만들었다.

```jsx

// hooks/useQuery.js
export function useQuery(url, initialData, options = {}) {
  const { data, error, isFetching, isLoading } = useReactQuery({
    url, // 데이터를 가져올 엔드포인트 URL
    initialData, // 초기 데이터로 사용될 값, 데이터를 가져오는 동안 로딩 중에 사용된다.
    
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
```

```jsx
// src/index.js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 포커스를 얻었을 때 다시 데이터를 가져올지 여부
      retry: 3, // 요청이 실패한 경우 재시도 횟수
      retryDelay: 1000, // 재시도 간격
    },
  },
});
```

- 코드 설명
    
    **useQuery는 서버에서 데이터를 가져오는 데 사용하는 함수인데**, `queryFn`과 `queryKey`라는 두가지 파라미터가 필수이다.
    
    `queryFn`을 통해 서버에서 데이터를 가져오고, 이것을 `queryKey`값으로 저장하여 앱 내부에서 다시 가져오고, 캐싱하고 공유할 수 있다. `queryKey`는 배열이어야 한다.
    
    **실제 데이터를 가져오는 async/await 비동기 처리를 할 수 있고, `queryKey`를 사용하여 캐시 키를 설정하여 기본 동작을 공통으로 사용할 수 있게 하였다.**
    
    가져온 데이터를 포함하는 객체인 `data`, 데이터를 가져오는 중에 발생한 오류를 포함하는 객체인 `error`, 데이터를 가져오는 중인지 여부를 나타내는 bool값 `isFetching`, 초기 데이터를 가져오는 중인지 여부를 나타내는 bool값 `isLoading`을 return한다.
    
    `**QueryClient`는 데이터 쿼리 및 캐시 관리를 담당한다.** 
    
    **이렇게 설정을 해놓으면 React Query를 사용할 때 전역적으로 적용된다.**
    
    `<QueryClientProvider client={queryClient}>` 로 React Query의 기능을 앱 전체에 설정한다.  
    

## 🥕 Axios interceptors 사용하여 HTTP Error 처리

기존의 코드는 axios도 useQuery 함수 내부에 있었는데, 멘토링 때 axios interceptor를 사용하면 좋을 것 같다는 말씀을 해주셔서 useQuery 함수 외부로 분리를 하였다. 

전역으로 해놓으면 한 번 실행되고, useQuery 안에 있으면 그걸 사용하는 컴포넌트들이 각각 실행한다.

분리를 하면 모듈화를 강하게 하고 `useQuery`를 다른 컴포넌트에서 재사용을 할 수 있게 된다는 장점이 있다. 

- 코드 보기
    
    ```jsx
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
    ```  
    

## 🥕 Portal을 이용한 모달 구현

리액트는 부모 컴포넌트가 렌더링 되면 자식 컴포넌트가 렌더링 되는 Tree 구조를 가진다.

보통 최상위 컴포넌트인 #root 의 div 태그 아래에 부모 컴포넌트부터 렌더링 된다.

이런 Tree 구조는 DOM 계층 구조에서 부모-자식 간에 CSS 상속 같은 영향을 미친다.

하지만 리액트 포탈을 사용하면 독립적인 위치에서 렌더링한다.

독립적인 위치에서 렌더링 하면 부모 컴포넌트의 영향을 받지 않을 수 있다.

따라서 리액트 포탈을 사용하면 CSS 충돌을 방지하고 레이아웃 및 이벤트 처리를 효과적으로 할 수 있어 유지 보수성을 향상시킬 수 있다.

```jsx
<!doctype html>
<html lang="ko">
  <head>    
    <title>Open Mind</title>
  </head>
  <body>
		// 리액트 컴포넌트가 렌더링 되는 곳
    <div id="root"></div>
		// Portal 을 이용하여 #modal-container 에서 모달 렌더링
    <div id="modal-container"></div>
  </body>
</html>
```  

## 🥕 쿼리 스트링을 이용한 모달 상태 관리
기존의 모달 방식은 모달을 열고 닫으려면 부모 컴포넌트에서 모달에 open 여부의 state를 사용해야 하고, 모달을 종료하는 setOpen(false) 함수도 전달해야 한다.

또한 뒤로가기를 누르면 모달창이 꺼지는게 아닌 리스트 페이지로 가버렸다.

모달로 넘겨야 하는 prop 도 줄이고, 뒤로가기를 누르면 모달을 끌 수 있게 바꿔보고 싶었다.

이러한 이유로 간단하고도 효과적인 쿼리 스트링을 이용하여 리팩토링 해보았다.

```jsx
function Post() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalOpen = searchParams.get("open"); // router로 쿼리 스트링 이용
  const navigate = useNavigate();
  const { subjectId } = useParams(); // router의 url parameter

  // 쿼리 스트링을 이용하여 open 값으로 모달 종류 선택 및 열고 닫기 가능
  const handleModalOpen = () => navigate(`/post/${subjectId}?open=true`);

  return (
    <>      
      {isModalOpen && (
        <Modal>
          모달 내용
          <button onClick={() => navigate(-1)}>모달 닫기</button>
        </Modal>
      )}
      <button onClick={handleModalOpen}>모달 열기</button>
    </>
  );
}

export default Post;
```  
<br/>

## ⚒️ 문제 및 해결 방법 

### Reaction 데이터(좋아요, 싫어요) 처리

🍎 **원하는 동작**

reaction 버튼 클릭 시 카운트 +1, 클릭 해제 시 카운트 -1

🍎 **문제**

Reaction에 대한 get API가 존재하지 않고, post 또한 값을 감소시키는 type도 없고  증가시키는 type만 있는 상황에서 데이터를 어떻게 처리해야 하는지에 대한 문제가 있었음

🍎 **해결방법**

현재 local 상태만 고려하여 데이터 처리
1. 처음에 페이지에 진입하면 좋아요, 싫어요가 0으로 표시됨
2. 좋아요, 싫어요를 누르면 1 올라갔다가 다시 누르면 원래 숫자로 내려감(이 상태 정보를 localStorage에 question_id를 key로 저장)
3. 다시 페이지에 진입하면 localStorage에 있는 reaction 상태를 가져와서 post해줌
4. reaction값을 변경한 question의 좋아요, 싫어요 갯수가 표시되고, 이후 2번 부터 동작 반복

완벽한 동작은 아니나 현재 상태에서 어색하지 않은 동작을 보여줄 수 있도록 구현 

<p align="center"><img src="https://github.com/Team7-OpenMind/OpenMind/assets/68732996/7f8bd4ba-4156-4728-b3b8-135e88b27821" width="900" /></p>


### 새로고침 시 Redux store의 상태 유지

<br/>

## ✏ 기술스택
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-efac97?style=for-the-badge&logo=styledcomponents&logoColor=black"> <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/redux-7f42c1?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/webpack-black?style=for-the-badge&logo=webpack&logoColor=#8ED5FA">  
<br/>

## 🎮 배포 주소
> [OpenMind 바로가기](https://open-mind-7.vercel.app/)  
<br/>

## 코딩 컨벤션

https://jinahp.notion.site/57dbc5b81c344b5faa253bd0ef37b2c4

## 커밋 컨벤션

https://jinahp.notion.site/443d8c8d3d194214ba88e8dac938e6cf  
<br/>

## ⛵ 이후 업데이트
