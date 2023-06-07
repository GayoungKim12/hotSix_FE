import "./App.css";
import Post from "./components/post/Post";
import { Routes ,Route,} from 'react-router-dom'
import Main from "./pages/Main";
import ChatLoomPage from "./pages/Chat/ChatLoomPage";
import ChatPage from "./pages/Chat/ChatListPage";
import AlarmPage from "./pages/Alarm/AlarmPage";

function App() {


  return (

      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/ChatListPage" element={<ChatPage></ChatPage>}></Route>
        <Route path="/ChatLoom" element={<ChatLoomPage></ChatLoomPage>}></Route>
        <Route path="/AlarmPage" element={<AlarmPage></AlarmPage>}></Route>
      </Routes>

  );
}

export default App;
