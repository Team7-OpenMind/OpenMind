import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import List from "pages/List";
import Post from "pages/Post";
import Answer from "pages/Answer"; //잠깐 테스트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="test" element={<Answer />} />
          <Route path="post/:subjectId">
            <Route index element={<Post />} />
            <Route path="answer" element={<Answer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
