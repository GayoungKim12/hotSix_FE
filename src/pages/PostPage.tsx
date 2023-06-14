import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import EditPost from "../components/Post/EditPost";
import Header from "../components/Post/Header";

const PostPage = () => {
  const { postId } = useParams();

  return (
    <>
      <Header />
      <div className="bg-main-100">{postId ? <EditPost postId={postId} /> : <Post />}</div>
    </>
  );
};

export default PostPage;
