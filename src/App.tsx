import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import ChatLoomPage from "./pages/Chat/ChatLoomPage";
import ChatPage from "./pages/Chat/ChatListPage";
import AlarmPage from "./pages/Alarm/AlarmPage";
import Search from "./pages/Search";
import SignUp from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";

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
      <Route path="/search" element={<Search />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
    </Routes>
  );
}

export default App;
