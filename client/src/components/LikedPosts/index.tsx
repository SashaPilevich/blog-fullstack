import { PostList } from "../Posts/List";
import { useSelector } from "react-redux";
import { TState } from "../../redux/store";

export const LikedPosts = () => {
  const posts = useSelector((state: TState) => state.PostsReducer.likedPosts);
  return <PostList posts={posts} />;
};
