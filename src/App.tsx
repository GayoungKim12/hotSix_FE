import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PostPage from "./pages/PostPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/post" element={<PostPage />}></Route>
      <Route path="/detail" element={<DetailPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  );
}

export default App;
