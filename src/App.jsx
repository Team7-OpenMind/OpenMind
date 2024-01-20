import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import List from "pages/List";
import Post from "pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="post" element={<Post />}>
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
