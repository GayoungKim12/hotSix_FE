import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import ChatLoomPage from "./pages/Chat/ChatLoomPage";
import ChatPage from "./pages/Chat/ChatListPage";
import AlarmPage from "./pages/Alarm/AlarmPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/post" element={<PostPage />}></Route>
      <Route path="/detail" element={<DetailPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/ChatListPage" element={<ChatPage></ChatPage>}></Route>
      <Route path="/ChatLoom" element={<ChatLoomPage></ChatLoomPage>}></Route>
      <Route path="/AlarmPage" element={<AlarmPage></AlarmPage>}></Route>

    </Routes>
  );
}

export default App;
