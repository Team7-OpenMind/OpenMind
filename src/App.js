import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Post from "./pages/Post.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
          <Route path="post" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
