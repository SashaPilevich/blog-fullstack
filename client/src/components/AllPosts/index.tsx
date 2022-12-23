import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../Button";
import { Input } from "../Input";
import { PostList } from "../Posts/List";
import { Preloader } from "../Preloader";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { TState } from "../../redux/store";
import { loadAllPosts, loadMorePosts } from "../../redux/actions/posts";
import { fetchPosts } from "../../http/postsApi";
import { IPost } from "../../types/post";
import { response } from "express";

export const AllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { user, isDark } = useContext(Context);

  const navigate = useNavigate();
  const navigateToAddPost = () => {
    navigate("/addpost");
  };
  // const backToAllPost = () => {
  //   setSearchText("");
  //   setNoPosts(false);
  //   dispatch(loadAllPosts("") as any);
  // };

  // const loadMore = () => {
  //   dispatch(loadMorePosts(searchText) as any);
  // };

  // const handleOnChangeSearch: ChangeEventHandler<HTMLInputElement> = (
  //   event
  // ) => {
  //   const text = event.target.value;
  //   setSearchText(text);
  //   dispatch(loadAllPosts(text) as any);
  // };
  useEffect(() => {
    fetchPosts().then((response) => {
      setPosts(response.rows);
      return response.rows;
    });
  }, []);
  return (
    <>
      <div className={style.infoPanel}>
        {user ? (
          <div className={style.container}>
            <h2
              className={`${style.titleLogin} ${
                isDark ? style.darkTitleLogin : null
              }`}
            >
              All posts
            </h2>{" "}
            <button
              className={`${style.btnAdd} ${isDark ? style.btnAddDark : ""}`}
              onClick={navigateToAddPost}
            >
              +Add
            </button>
          </div>
        ) : (
          <h2 className={`${style.title} ${isDark ? style.darkTitle : ""}`}>
            All posts
          </h2>
        )}

        <p
          className={`${style.textSearch} ${
            isDark ? style.darkTextSearch : null
          }`}
        >
          Search
        </p>
        {/* <Input
          // onChange={handleOnChangeSearch}
          value={searchText}
          uniqType="search"
        />
      </div> */}
      </div>

      <PostList posts={posts} />
      {/* {noPosts ? (
            <p className={`${style.noPosts} ${isDark ? style.darkNoPost : ""}`}>
              NO posts...
            </p>
          ) : (
            ""
          )} */}
      {/* {showLoadMore ? (
            <Button
              label={"Load More"}
              onClick={loadMore}
              type="buttonForRegistration"
            />
          ) : (
            <Button
              label={"Go Back"}
              onClick={backToAllPost}
              type="buttonForRegistration"
            />
          )} */}
    </>
  );
};
