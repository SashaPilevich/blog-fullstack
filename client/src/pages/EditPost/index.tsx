import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { AddPostItem } from "../../components/AddPostForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost } from "../../types/post";
import { getOneMyPost } from "../../http/postsApi";
import { setIsLoading } from "../../redux/actions/posts";

export const EditPost = () => {
  const params = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  // useEffect(() => {
  //   const promise = fetch(
  //     `https://studapi.teachmeskills.by/blog/posts/${params.id}`
  //   );
  //   promise
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((values) => {
  //       setPost(values);
  //     });
  // }, []);
  useEffect(() => {
    const promise = getOneMyPost(Number(params.id));
    promise
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPost(json);
        return json;
      });
  }, []);
  return (
    <Container>
      <Header />
      {post ? (
        <AddPostItem
          isEdit={true}
          defaultTitle={post?.title}
          defaultText={post?.text}
          defaultImage={post?.image}
          postId={post.id}
        />
      ) : null}
    </Container>
  );
};
