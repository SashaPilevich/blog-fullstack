import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectPosts } from "../../../http/postsApi";
import { IPost } from "../../../types/post";
import { Button } from "../../Button";
import { ItemOfPost } from "../Item";
import style from "./style.module.css";

interface IProps {
  posts: IPost[];
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
}

export const PostList = (props: IProps) => {
  const params: any = useParams();

  const [post, setPost] = useState<IPost | null>(null);
  useEffect(() => {
    // const promise = fetch(
    //   `https://studapi.teachmeskills.by/blog/posts/${params.id}`
    // );
    // promise
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((values) => {
    //     setPost(values);
    //   });
    // selectPosts(params.id).then((response) => {
    //   setPost(response);
    //   console.log(response);
    //   return response;
    // });
  }, []);
  const navigate = useNavigate();
  const navigateToFullPost = (id: number) => {
    navigate(`/posts/${id}`);
    // selectPosts(id).then((response) => {
    //   setPost(response);
    //   console.log(response);
    //   return response;
    // });
  };
  return (
    <div className={style.container}>
      {props.posts.length !== 0
        ? props.posts.map((item) => {
            const clickPost = () => {
              navigateToFullPost(item.id);
            };

            const clickDelete: MouseEventHandler<HTMLButtonElement> = (
              event
            ) => {
              event.stopPropagation();
              if (props.onClickDelete) {
                props.onClickDelete(item.id);
              }
            };
            const clickEdit: MouseEventHandler<HTMLButtonElement> = (event) => {
              event.stopPropagation();
              if (props.onClickEdit) {
                props.onClickEdit(item.id);
                console.log(item.id);
              }
            };
            return (
              <div key={item.id} onClick={clickPost}>
                <ItemOfPost
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  // lesson_num={item.lesson_num}
                  title={item.title}
                  // author={item.author}
                  image={item.image}
                  // date={item.date}
                  marked={item.marked}
                  liked={item.liked}
                />
                <div className={style.btnContainer}>
                  {props.onClickDelete ? (
                    <Button
                      label="Remove Post"
                      onClick={clickDelete}
                      type="remove"
                    />
                  ) : null}
                  {props.onClickEdit ? (
                    <Button
                      label="Edit Post"
                      onClick={clickEdit}
                      type="remove"
                    />
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
