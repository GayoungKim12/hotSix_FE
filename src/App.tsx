import "./App.css";
import Post from "./components/post/Post";
import { Routes ,Route,} from 'react-router-dom'
import Main from "./pages/Main";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
      </Routes>
  );
}

export default App;
