import style from "./style.module.css";
import { Like, Mark, picture1 } from "../../../assets";
import { IPost } from "../../../types/post";
import {
  useState,
  ReactEventHandler,
  useContext,
  MouseEventHandler,
  MouseEvent,
} from "react";
import { Context } from "../../../App";
import { useDispatch } from "react-redux";
import { likePost, markPost } from "../../../redux/actions/posts";
import { Button } from "../../Button";

interface IItem extends IPost {
  isLarge?: boolean;
}
export const ItemOfPost = (props: IItem) => {
  const [image, setImage] = useState(props.image);
  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const { isLarge, ...post } = props;
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
  };
  const handleLikePost: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    dispatch(likePost(post));
  };
  const handleMarkPost: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    dispatch(markPost(post));
  };
  return (
    <div
      className={`${style.container} ${props.isLarge ? style.largePost : ""}`}
    >
      {image ? (
        <img
          className={`${style.image} ${props.isLarge ? style.largeImage : ""}`}
          src={process.env.REACT_APP_API_URL + image}
          alt={props.title}
          onError={handleError}
        />
      ) : (
        <img className={style.image} src={picture1} alt={props.title} />
      )}

      <h2 className={style.title}>{props.title}</h2>
      <p className={`${style.text} ${props.isLarge ? style.largeText : ""}`}>
        {props.text}
      </p>
      <div className={style.info}>
        {/* <h5 className={style.date}>{props.date}</h5> */}
        {user ? (
          <>
            <button onClick={handleLikePost}>
              <Like fill={props.liked ? "yellow" : "black"} />
            </button>
            <button onClick={handleMarkPost}>
              <Mark fill={props.marked ? "yellow" : "#C6DDFF"} />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
