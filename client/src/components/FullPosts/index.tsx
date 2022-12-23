import { useContext } from "react";
import { Context } from "../../App";
import { picture1 } from "../../assets";
import { IPost } from "../../types/post";
import { ItemOfPost } from "../Posts/Item";
import style from "./style.module.css";

export const FullPosts = (props: IPost) => {
  return <ItemOfPost {...props} isLarge={true} />;
};
