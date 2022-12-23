import { visitFunctionBody } from "typescript";
import { tmsFetch } from "../utils/fetch";

export const fetchPosts = (searchText: string, offset?: number) => {
  return fetch(
    `https://studapi.teachmeskills.by/blog/posts/?limit=6&search=${searchText}&offset=${offset}`
  ).then((response) => {
    return response.json();
  });
};

export const fetchMyPosts = () => {
  return tmsFetch("https://studapi.teachmeskills.by/blog/posts/my_posts/").then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        return { status: response.status };
      }
    }
  );
};

export const createPost = (body: FormData) => {
  return tmsFetch("https://studapi.teachmeskills.by/blog/posts/", {
    method: "POST",
    body: body,
  });
};

export const removePost = (id: number) => {
  return tmsFetch(`https://studapi.teachmeskills.by/blog/posts/${id}`, {
    method: "DELETE",
  });
};

export const editPost = (body: FormData, id: number) => {
  return tmsFetch(`https://studapi.teachmeskills.by/blog/posts/${id}`, {
    method: "PATCH",
    body: body,
  });
};
