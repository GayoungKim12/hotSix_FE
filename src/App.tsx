import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import ChatRoomPage from "./pages/Chat/ChatRoomPage";
import ChatPage from "./pages/Chat/ChatListPage";
import AlarmPage from "./pages/AlarmPage";
import { Provider } from "jotai";
import SignUp from "./pages/SignupPage";
import Signin from "./components/Signin/Signin";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import CartPage from "./pages/CartPage";
import Editprofile from "./pages/EditprofilePage";
import Findpassword from "./pages/FindpasswordPage";
import Editpassword from "./pages/EditpasswordPage";

const queryClient = new QueryClient();

function App() {
  return (
  <Provider>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/post" element={<PostPage />}></Route>
          <Route path="/edit/:postId" element={<PostPage />}></Route>
          <Route path="/detail/:postId" element={<DetailPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile/:profileId" element={<ProfilePage />}></Route>
          <Route path="/ChatListPage" element={<ChatPage></ChatPage>}></Route>
          <Route path="/ChatRoom" element={<ChatRoomPage></ChatRoomPage>}></Route>
          <Route path="/AlarmPage" element={<AlarmPage></AlarmPage>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/editprofile" element={<Editprofile />}></Route>
          <Route path="/findPassword" element={<Findpassword />}></Route>
          <Route path="/Editpassword" element={<Editpassword />}></Route>
        </Routes>
      </QueryClientProvider>
    </CookiesProvider>
  </Provider>
  );
}
export default App;
