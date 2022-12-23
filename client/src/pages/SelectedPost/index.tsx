import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { FullPosts } from "../../components/FullPosts";
import { Header } from "../../components/Header";
import { IPost } from "../../types/post";
import style from "./style.module.css";
import { NotificationManager } from "react-notifications";
import { Preloader } from "../../components/Preloader";
import { fetchPosts, selectPosts } from "../../http/postsApi";

export const SelectedPost = () => {
  const { isDark } = useContext(Context);
  const params: any = useParams();

  const [post, setPost] = useState<IPost | null>(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    selectPosts(params.id).then((response) => {
      setPost(response);
      return response;
    });
  }, []);

  const handleRemovePost = () => {
    if (post?.id) {
      // removePost(post.id).then((response) => {
      //   if (response.ok) {
      //     NotificationManager.success("Удаление поста", " Пост успешно удален");
      //     navigate(-1);
      //   } else {
      //     NotificationManager.console.error("Удаление поста", "Пост не удален");
      //   }
      // });
    }
  };
  return (
    <Container>
      <Header />
      <div
        className={`${style.container} ${isDark ? style.darkContainer : ""}`}
      >
        <h2
          className={`${style.selectedPost} ${
            isDark ? style.darkSelectedPost : ""
          }`}
        >
          Selected Post
        </h2>
        {post ? (
          <FullPosts
            key={post.id}
            id={post.id}
            text={post.text}
            // lesson_num={post.lesson_num}
            title={post.title}
            // author={post.author}
            image={post.image}
            // date={post.date}
          />
        ) : (
          <Preloader />
        )}
        {user?.id === post?.userId ? (
          <div className={style.btnContainer}>
            <Button label="Remove" onClick={handleRemovePost} type="remove" />
          </div>
        ) : null}
      </div>
    </Container>
  );
};
