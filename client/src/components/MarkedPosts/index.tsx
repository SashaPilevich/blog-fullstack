import { TState } from "../../redux/store";
import { PostList } from "../Posts/List";
import { useSelector } from "react-redux";

export const MarkedPosts = () => {
  const posts = useSelector((state: TState) => state.PostsReducer.markedPosts);
  return <PostList posts={posts} />;
};
