import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Context } from "../../App";
import { fetchPosts } from "../../http/postsApi";
import { loadAllPosts } from "../../redux/actions/posts";
import { AllPosts } from "../AllPosts";
import { Button } from "../Button";
import { LikedPosts } from "../LikedPosts";
import { MarkedPosts } from "../MarkedPosts";
import style from "./style.module.css";

export type ITab = "All" | "Liked" | "Marked";

export const getTabList = (tab: ITab) => {
  if (tab === "All") {
    return <AllPosts />;
  }
  if (tab === "Liked") {
    return <LikedPosts />;
  }
  if (tab === "Marked") {
    return <MarkedPosts />;
  }
  return null;
};

export const PostsTabs = () => {
  const { user } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState<ITab>("All");
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadAllPosts("") as any);
    fetchPosts();
  }, []);
  if (!user) {
    return <AllPosts />;
  }
  return (
    <>
      <div className={style.tabContainer}>
        <Button
          label={"All"}
          onClick={() => {
            setSelectedTab("All");
          }}
          type={selectedTab === "All" ? "activeTab" : "unActiveTab"}
        />
        <Button
          label={"Liked"}
          onClick={() => {
            setSelectedTab("Liked");
          }}
          type={selectedTab === "Liked" ? "activeTab" : "unActiveTab"}
        />
        <Button
          label={"Marked"}
          onClick={() => {
            setSelectedTab("Marked");
          }}
          type={selectedTab === "Marked" ? "activeTab" : "unActiveTab"}
        />
      </div>
      {getTabList(selectedTab)}
    </>
  );
};
